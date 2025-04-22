import Image from 'next/image'
import React from 'react'
import { BsCheckCircleFill, BsBoxSeam, BsCreditCard, BsShieldCheck } from 'react-icons/bs'
import { FiTruck, FiClock } from 'react-icons/fi'

const Order = () => {
  const order = [
    {
      src: 'https://m.media-amazon.com/images/I/7183mkggQYL._AC_SX569_.jpg',
      title: "True Classic Mens T-Shirts - Short Sleeve Crew Neck Plain Novelty T Shirt for Men",
      price: '27.99',
      color: "Navy Blue",
      size: "M",
      quantity: 1
    },
    {
      src: 'https://m.media-amazon.com/images/I/7183mkggQYL._AC_SX569_.jpg',
      title: "True Classic Mens T-Shirts - Short Sleeve Crew Neck Plain Novelty T Shirt for Men",
      price: '27.99',
      color: "Black",
      size: "L",
      quantity: 2
    },
    {
      src: 'https://m.media-amazon.com/images/I/7183mkggQYL._AC_SX569_.jpg',
      title: "True Classic Mens T-Shirts - Short Sleeve Crew Neck Plain Novelty T Shirt for Men",
      price: '27.99',
      color: "White",
      size: "XL",
      quantity: 1
    }
  ];

  const subtotal = order.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

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
          <p className="text-gray-500 mt-1">Order #8771233 • Placed on {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Order Details */}
            <div className="md:w-2/3 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <BsShieldCheck className="text-pink-500 text-xl" />
                </div>
                <h2 className="ml-3 text-xl font-semibold text-gray-800">Sandhu CodesWear</h2>
              </div>

              {/* Order Status Timeline */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status</h3>
                <div className="flex items-center justify-between relative">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mb-2">
                      <BsBoxSeam className="text-pink-500" />
                    </div>
                    <span className="text-sm font-medium text-pink-600">Order Placed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mb-2">
                      <BsCreditCard className="text-pink-500" />
                    </div>
                    <span className="text-sm font-medium text-pink-600">Payment Processed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <FiTruck className="text-gray-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-500">Shipped</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <BsCheckCircleFill className="text-gray-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-500">Delivered</span>
                  </div>
                  <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
                    <div className="h-1 bg-pink-500 w-2/4"></div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Your Items ({order.length})</h3>
                <div className="divide-y divide-gray-200">
                  {order.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 py-4 items-center">
                      <div className="col-span-6 flex items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                          <Image 
                            src={item.src} 
                            alt={item.title} 
                            width={64} 
                            height={64} 
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 line-clamp-1">{item.title}</h4>
                          <p className="text-sm text-gray-500">Color: {item.color} • Size: {item.size}</p>
                        </div>
                      </div>
                      <div className="col-span-3 text-center text-gray-700">{item.quantity}</div>
                      <div className="col-span-3 text-right font-medium">${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({order.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-pink-600">${total.toFixed(2)}</span>
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
                  John Doe<br />
                  123 Main Street<br />
                  Apt 4B<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Estimated Delivery</h4>
                <div className="flex items-center text-gray-800">
                  <FiClock className="mr-2" />
                  {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Method</h4>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <BsCreditCard className="text-gray-600" />
                  </div>
                  <span className="text-gray-800">Visa ending in 4242</span>
                </div>
              </div>

              <button className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition duration-200 flex items-center justify-center">
                <FiTruck className="mr-2" />
                Track Your Order
              </button>

              <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                <h4 className="text-sm font-medium text-pink-700 mb-2">Need help with your order?</h4>
                <p className="text-xs text-pink-600">Our customer service team is available 24/7 to assist you with any questions.</p>
                <button className="mt-2 text-sm text-pink-600 font-medium hover:underline">Contact Support</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order