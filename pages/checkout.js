import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineArrowLeft } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Slide, toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ cart, subTotal, clearCart, formValues, setFormValues, errorMessage, setErrorMessage }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if(!localStorage.getItem('token')){
      router.push('/')
    }
  
  }, [router.query])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (value && errorMessage[name]) {
      setErrorMessage(prev => ({ ...prev, [name]: false }));
    }
  };
 
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);
  
    if (!stripe || !elements) {
      toast.error('Stripe not initialized');
      return;
    }
  
    try {
      // Validate required fields
      const requiredFields = ['name', 'email', 'address', 'phone', 'city', 'state', 'pincode'];
      let hasError = false;
  
      const newErrors = {};
      requiredFields.forEach(field => { newErrors[field] = false; });
      setErrorMessage(newErrors);
  
      for (const field of requiredFields) {
        if (!formValues[field]) {
          setErrorMessage(prev => ({ ...prev, [field]: true }));
          hasError = true;
        }
      }
  
      if (formValues.email && !/^\S+@\S+\.\S+$/.test(formValues.email)) {
        setErrorMessage(prev => ({ ...prev, email: true }));
        hasError = true;
      }
  
      if (formValues.phone && !/^[0-9]{10,15}$/.test(formValues.phone)) {
        setErrorMessage(prev => ({ ...prev, phone: true }));
        hasError = true;
      }
  
      if (hasError) {
        setProcessing(false);
        return;
      }
  
      // Step 1: Create Payment Intent
      toast.info('Initiating payment...', { autoClose: 2000 });
      const paymentIntentRes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(subTotal * 100),
          currency: 'pkr',
          metadata: {
            cart: JSON.stringify(Object.keys(cart).map(itemCode => ({
              id: itemCode,
              qty: cart[itemCode].qty,
              size: cart[itemCode].size,
              color: cart[itemCode].variant
            }))),
            customer: JSON.stringify({
              name: formValues.name,
              email: formValues.email,
              phone: formValues.phone
            })
          }
        }),
      });
  
      const paymentIntentData = await paymentIntentRes.json();
      if (!paymentIntentRes.ok) throw new Error(paymentIntentData.error || 'Payment failed');
  
  
      // Step 2: Confirm Payment
      toast.info('Confirming payment...', { autoClose: 2000 });
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(paymentIntentData.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formValues.name,
            email: formValues.email,
            address: {
              line1: formValues.address,
              city: formValues.city,
              state: formValues.state,
              postal_code: formValues.pincode,
              country: 'PK',
            },
            phone: formValues.phone,
          },
        },
      });
  
      if (stripeError) {
        toast.error(stripeError.message);
        throw new Error(stripeError.message);
      }
  
      if (paymentIntent.status === 'succeeded') {
        // Prepare products array with all details
        const products = Object.keys(cart).map(itemCode => ({
          productId: cart[itemCode].id,
          title: cart[itemCode].name, // Changed from 'name' to 'title' to match model
          size: cart[itemCode].size,
          color: cart[itemCode].variant, // Changed from 'variant' to 'color' to match model
          quantity: cart[itemCode].qty,
          img: cart[itemCode].image, // Changed from 'image' to 'img' to match model
          amount: cart[itemCode].price // Added amount field
        }));
  
        // Post Order with complete product details
        const postOrderRes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/orders/postorder`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formValues.email,
            paymentId: paymentIntent.id,
            products: products,
            address: formValues.address,
            city: formValues.city,
            pincode: formValues.pincode,
            state: formValues.state,
            amount: subTotal,
            onlinePayment: true,
            status: 'Payment Processed'
          }),
        });
  
        const postOrderData = await postOrderRes.json();
        if (!postOrderRes.ok) throw new Error(postOrderData.error || 'Order saving failed');
        toast.success('Payment successful! Redirecting...', {
          onClose: () => {
            clearCart();
            router.push(`/order-confirmation?id=${postOrderData.order.orderId}`);
          }
        });
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setProcessing(false);
    }
  };
  
  

  return (
    <>
      <ToastContainer 
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <div className="mb-6">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <button
        type="submit"
        form="payment-form"
        disabled={!stripe || processing}
        onClick={handleSubmit}
        className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? (
          'Processing...'
        ) : (
          <>
            <BsFillBagCheckFill className="mr-2" />
            Pay PKR {subTotal.toLocaleString('en-PK')}
          </>
        )}
      </button>
    </>
  );
};

const Checkout = ({ userInfo,  cart, clearCart, addToCart, removeFromCart, subTotal }) => {
  const [formValues, setFormValues] = useState({
    name: `${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`.trim() || '',
    email: userInfo?.email || '',
    address: userInfo?.address || '',
    phone: userInfo?.phone || '',
    city: '',
    state: '',
    pincode: ''
  });

  const [errorMessage, setErrorMessage] = useState({
    name: false,
    email: false,
    address: false,
    phone: false,
    city: false,
    state: false,
    pincode: false,
  });

  const getFieldError = (fieldName) => {
    if (!errorMessage[fieldName]) return null;
    
    const messages = {
      name: "Please enter your name",
      email: "Please enter a valid email",
      address: "Please enter your address",
      phone: "Please enter a valid phone number (10-15 digits)",
      city: "Please enter your city",
      state: "Please enter your state",
      pincode: "Please enter your postal code"
    };
    
    return <p className="mt-1 text-sm text-red-600">{messages[fieldName]}</p>;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-pink-600 hover:text-pink-700">
          <AiOutlineArrowLeft className="mr-1" /> Continue Shopping
        </Link>
      </div>

      <h1 className="font-bold text-3xl mb-8 text-center text-gray-800">Checkout</h1>

      <form id="payment-form" className="flex flex-col lg:flex-row gap-8">
        {/* Delivery Details Section */}
        <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-6">
          <h2 className="font-semibold text-2xl mb-6 text-gray-700 border-b pb-2">Delivery Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={(e) => {
                  setFormValues({...formValues, name: e.target.value});
                  if (e.target.value) setErrorMessage({...errorMessage, name: false});
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              />
              {getFieldError('name')}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={(e) => {
                  setFormValues({...formValues, email: e.target.value});
                  if (e.target.value) setErrorMessage({...errorMessage, email: false});
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              />
              {getFieldError('email')}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Complete Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formValues.address}
                onChange={(e) => {
                  setFormValues({...formValues, address: e.target.value});
                  if (e.target.value) setErrorMessage({...errorMessage, address: false});
                }}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              />
              {getFieldError('address')}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formValues.phone}
                onChange={(e) => {
                  setFormValues({...formValues, phone: e.target.value});
                  if (e.target.value) setErrorMessage({...errorMessage, phone: false});
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              />
              {getFieldError('phone')}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formValues.city}
                onChange={(e) => {
                  setFormValues({...formValues, city: e.target.value});
                  if (e.target.value) setErrorMessage({...errorMessage, city: false});
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              />
              {getFieldError('city')}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State/Province
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formValues.state}
                onChange={(e) => {
                  setFormValues({...formValues, state: e.target.value});
                  if (e.target.value) setErrorMessage({...errorMessage, state: false});
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              />
              {getFieldError('state')}
            </div>

            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formValues.pincode}
                onChange={(e) => {
                  setFormValues({...formValues, pincode: e.target.value});
                  if (e.target.value) setErrorMessage({...errorMessage, pincode: false});
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              />
              {getFieldError('pincode')}
            </div>
          </div>
        </div>

        {/* Cart Review Section */}
        <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6">
          <h2 className="font-semibold text-2xl mb-6 text-gray-700 border-b pb-2">Your Cart</h2>

          {Object.keys(cart).length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Your cart is empty</p>
              <Link href={'/'}>
                <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition cursor-pointer">
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {Object.keys(cart).map((itemCode) => {
                  const item = cart[itemCode];
                  return (
                    <div key={itemCode} className="py-4 flex">
                      <div className="w-1/3 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded object-cover"
                        />
                      </div>
                      <div className="w-2/3 pl-4">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                        <p className="text-sm text-gray-500">
                          Color: <span 
                            className="inline-block w-4 h-4 rounded-full border border-gray-200 ml-1"
                            style={{ backgroundColor: (item.variant || '').toLowerCase() }}
                          />
                        </p>
                        <p className="text-pink-500 font-bold mt-1">PKR {item.price.toLocaleString('en-PK')}</p>

                        <div className="flex items-center mt-2">
                          
                          <span className=" text-gray-700">{`Quantity: ${item.qty}`}</span>
                          
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-200 mt-6 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">PKR {subTotal.toLocaleString('en-PK')}</span>
                </div>

                <Elements stripe={stripePromise}>
                  <CheckoutForm 
                    cart={cart} 
                    subTotal={subTotal} 
                    clearCart={clearCart}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                  />
                </Elements>

                <button 
                  type="button"
                  onClick={clearCart} 
                  className="w-full border border-pink-500 text-pink-500 py-2 rounded-md hover:bg-pink-50 transition mt-2 cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Checkout;