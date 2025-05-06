import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image'
import { BsCheckCircleFill, BsBoxSeam, BsCreditCard, BsShieldCheck } from 'react-icons/bs'
import { FiTruck, FiClock } from 'react-icons/fi'
import { FaMapMarkerAlt, FaCreditCard, FaEnvelope } from 'react-icons/fa'

const Order = ({ orderData }) => {
  const router = useRouter()
  const { orderId } = router.query

  if (!orderData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">Order Not Found</h1>
          <p className="text-gray-600 mt-2">{`We couldn't find order #${orderId}`}</p>
          <button 
            onClick={() => router.push('/orders')}
            className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition cursor-pointer"
          >
            Back to Orders
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
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Order Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-pink-600 hover:text-pink-700 cursor-pointer"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Order #{orderData.orderId}</h1>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Order Status */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h2>
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

          {/* Order Summary */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Order Date</h3>
                <p className="text-gray-800">{orderDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Estimated Delivery</h3>
                <p className="text-gray-800 flex items-center">
                  <FiClock className="mr-2" />
                  {deliveryDate}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Payment Method</h3>
                <p className="text-gray-800 flex items-center">
                  <BsCreditCard className="mr-2" />
                  {orderData.onlinePayment ? 'Online Payment' : 'Cash on Delivery'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Payment Status</h3>
                <p className="text-gray-800 flex items-center">
                  <BsCheckCircleFill className="mr-2 text-green-500" />
                  {orderData.status}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Items ({orderData.products.length})</h2>
            <div className="space-y-6">
              {orderData.products.map((item, index) => (
                <div key={index} className="flex">
                  <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <Image 
                      src={item.img} 
                      alt={item.title} 
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-500">Color:</span>
                      <span 
                        className="inline-block w-4 h-4 rounded-full border border-gray-200 ml-2"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between items-end">
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="font-medium text-gray-800">PKR {item.amount.toLocaleString('en-PK')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Total</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">PKR {orderData.amount.toLocaleString('en-PK')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800">Free</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-semibold text-gray-800">PKR {orderData.amount.toLocaleString('en-PK')}</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                  <FaEnvelope className="mr-2" />
                  Email
                </h3>
                <p className="text-gray-800">{orderData.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                  <FaCreditCard className="mr-2" />
                  Payment ID
                </h3>
                <p className="text-gray-800">{orderData.paymentId}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  Shipping Address
                </h3>
                <p className="text-gray-800">
                  {orderData.address}<br />
                  {orderData.city}, {orderData.state}<br />
                  {orderData.pincode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export async function getServerSideProps(context) {
    const { orderId } = context.query
  
    if (!orderId) {
      return {
        redirect: {
          destination: '/orders',
          permanent: false,
        },
      }
    }
  
    try {
      // Use full URL if NEXT_PUBLIC_HOST isn't working
      const apiUrl = `${process.env.NEXT_PUBLIC_HOST}/api/orders/getorder`  
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId })
      })
  
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        toast.error(errorData.message || 'Failed to fetch order details')
      }
  
      const data = await response.json()
  
      if (!data.success) {
        toast.error(data.error || 'Order not found')
      }
  
      return {
        props: {
          orderData: data.order
        }
      }
    } catch (error) {
      return {
        props: {
          orderData: null,
          error: error.message
        }
      }
    }
  }

export default Order