import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FiEye } from "react-icons/fi";
import { BsBoxSeam, BsCheckCircleFill } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";

const Orders = ({ orders }) => {
  const router = useRouter();
  
  useEffect(() => {
    if(!localStorage.getItem('token')){
      router.push('/')
    }
  }, [router.query])

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Order Placed':
        return <BsBoxSeam className="text-blue-500" />;
      case 'Payment Processed':
        return <BsCheckCircleFill className="text-green-500" />;
      case 'Shipped':
        return <FiTruck className="text-yellow-500" />;
      case 'Delivered':
        return <BsCheckCircleFill className="text-purple-500" />;
      default:
        return <BsBoxSeam className="text-gray-500" />;
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Order Placed':
        return 'bg-blue-100 text-blue-800';
      case 'Payment Processed':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delivered':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  if(orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">My Orders</h1>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BsBoxSeam className="text-gray-400 text-3xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h2>
            <p className="text-gray-500 mb-6">{`You haven't placed any orders yet.`}</p>
            <button 
              onClick={() => router.push('/')}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order #
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.orderId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center text-sm ${getStatusColor(order.status)} px-3 py-1 rounded-full w-fit`}>
                          <span className="mr-2">{getStatusIcon(order.status)}</span>
                          {order.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          PKR {order.amount.toLocaleString('en-PK')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {order.products.reduce((sum, item) => sum + item.quantity, 0)} items
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => router.push(`/order?orderId=${order.orderId}`)}
                          className="text-pink-600 hover:text-pink-900 mr-4 cursor-pointer"
                          title="View Details"
                        >
                          <FiEye className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Orders;