import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { BsCheckCircleFill, BsBoxSeam, BsCreditCard, BsShieldCheck } from 'react-icons/bs'
import { FiTruck, FiClock } from 'react-icons/fi'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const OrderConfirmation = () => {
  const router = useRouter()
  const { id } = router.query
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      return
    }
  
    const fetchOrderData = async () => {
      try {
        setLoading(true)
        
        // Add headers to ensure proper content-type
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/orders/getorder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: id })
        })
  
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to fetch order details')
        }
  
        const data = await response.json()
        
        if (!data.success) {
          throw new Error(data.error || 'Invalid order data received')
        }
  
        setOrderData(data.order)
        setError(null)
      } catch (err) {
        setError(err.message)
        toast.error(err.message)
        
        if (err.message.includes('not found')) {
          setTimeout(() => router.push('/'), 2000)
        }
      } finally {
        setLoading(false)
      }
    }
  
    fetchOrderData()
  }, [id, router]) // Add router to dependency array

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your order details...</p>
        </div>
      </div>
    )
  }

  if (error || !orderData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BsCheckCircleFill className="text-red-500 text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'We couldn\'t find your order details.'}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  // Calculate dates
  const orderDate = new Date(orderData.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const deliveryDate = new Date(new Date(orderData.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  // Calculate order summary
  const subtotal = orderData.products.reduce((sum, item) => sum + (item.amount * item.quantity), 0)
  const shipping = subtotal > 5000 ? 0 : 250 // Free shipping for orders over PKR 5000
  const tax = subtotal * 0.05 // 5% tax
  const total = subtotal + shipping + tax

  // Order status timeline
  const statusStages = [
    { name: 'Order Placed', icon: <BsBoxSeam /> },
    { name: 'Payment Processed', icon: <BsCreditCard /> },
    { name: 'Shipped', icon: <FiTruck /> },
    { name: 'Delivered', icon: <BsCheckCircleFill /> }
  ]

  const currentStatusIndex = statusStages.findIndex(stage => stage.name === orderData.status)
  const progressWidth = ((currentStatusIndex + 1) / statusStages.length) * 100

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Order Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BsCheckCircleFill className="text-green-500 text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">Thank you for your purchase</p>
          <p className="text-gray-500 mt-1">{`Order #${orderData.orderId} • Placed on ${orderDate}`}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Order Details */}
            <div className="md:w-2/3 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <BsShieldCheck className="text-pink-500 text-xl" />
                </div>
                <h2 className="ml-3 text-xl font-semibold text-gray-800">CodesWear</h2>
              </div>

              {/* Order Status Timeline */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status</h3>
                <div className="flex items-center justify-between relative">
                  {statusStages.map((stage, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        index <= currentStatusIndex ? 'bg-pink-100' : 'bg-gray-100'
                      }`}>
                        {React.cloneElement(stage.icon, {
                          className: index <= currentStatusIndex ? 'text-pink-500' : 'text-gray-400'
                        })}
                      </div>
                      <span className={`text-sm font-medium ${
                        index <= currentStatusIndex ? 'text-pink-600' : 'text-gray-500'
                      }`}>{stage.name}</span>
                    </div>
                  ))}
                  <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
                    <div 
                      className="h-1 bg-pink-500 transition-all duration-500" 
                      style={{ width: `${progressWidth}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Your Items ({orderData.products.length})
                </h3>
                <div className="divide-y divide-gray-200">
                  {orderData.products.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 py-4 items-center">
                      <div className="col-span-6 flex items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                          <Image 
                            src={item.img} 
                            alt={item.title} 
                            width={64} 
                            height={64} 
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 line-clamp-1">{item.title}</h4>
                          <p className="text-sm text-gray-500">
                            Color: {item.color} • Size: {item.size}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-3 text-center text-gray-700">
                        {item.quantity}
                      </div>
                      <div className="col-span-3 text-right font-medium">
                        PKR {(item.amount * item.quantity).toLocaleString('en-PK')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({orderData.products.reduce((sum, item) => sum + item.quantity, 0)} items)
                    </span>
                    <span className="font-medium">PKR {subtotal.toLocaleString('en-PK')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `PKR ${shipping.toLocaleString('en-PK')}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span className="font-medium">PKR {tax.toLocaleString('en-PK')}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-pink-600">
                      PKR {total.toLocaleString('en-PK')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="md:w-1/3 bg-gray-50 p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Delivery Information</h3>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Shipping Address</h4>
                <p className="text-gray-800">
                  {orderData.address}<br />
                  {orderData.city}, {orderData.state}<br />
                  {orderData.pincode}<br />
                  Pakistan
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Estimated Delivery</h4>
                <div className="flex items-center text-gray-800">
                  <FiClock className="mr-2" />
                  {deliveryDate}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Method</h4>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <BsCreditCard className="text-gray-600" />
                  </div>
                  <span className="text-gray-800">
                    {orderData.onlinePayment ? 'Online Payment' : 'Cash on Delivery'}
                    {orderData.paymentId && (
                      <span className="block text-xs text-gray-500 mt-1">
                        Transaction ID: {orderData.paymentId}
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <button 
                className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition duration-200 flex items-center justify-center"
                onClick={() => {
                  // Implement tracking functionality
                  toast.info('Tracking information will be sent to your email')
                }}
              >
                <FiTruck className="mr-2" />
                Track Your Order
              </button>

              <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                <h4 className="text-sm font-medium text-pink-700 mb-2">
                  Need help with your order?
                </h4>
                <p className="text-xs text-pink-600">
                  Our customer service team is available 24/7 to assist you with any questions.
                </p>
                <button 
                  className="mt-2 text-sm text-pink-600 font-medium hover:underline"
                  onClick={() => router.push('/contact')}
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation