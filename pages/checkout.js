import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineArrowLeft } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = ({ cart, clearCart, addToCart, removeFromCart, subTotal }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-pink-600 hover:text-pink-700">
          <AiOutlineArrowLeft className="mr-1" /> Continue Shopping
        </Link>
      </div>

      <h1 className="font-bold text-3xl mb-8 text-center text-gray-800">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Delivery Details Section */}
        <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-6">
          <h2 className="font-semibold text-2xl mb-6 text-gray-700 border-b pb-2">Delivery Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="leading-7 text-sm text-gray-600">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                cols={30}
                rows={2}
              ></textarea>
            </div>

            <div>
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="state" className="leading-7 text-sm text-gray-600">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
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
                <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition cursor-pointer">
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
                        <p className="text-sm text-gray-500">Color:  <button
                      className={`border-2 ml-1 rounded-full w-4 h-4 focus:outline-none `}
                      style={{ backgroundColor: item.variant.toLowerCase() }}
                      
                    ></button></p>
                       
                        <p className="text-pink-500 font-bold mt-1">${item.price.toFixed(2)}</p>

                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => removeFromCart(itemCode, 1, item.price, item.name, item.size, item.variant, item.image)} 
                            className="text-gray-500 hover:text-pink-500 p-1 cursor-pointer"
                          >
                            <AiOutlineMinus className="text-sm" />
                          </button>
                          <span className="mx-2 text-gray-700">{item.qty}</span>
                          <button 
                            onClick={() => addToCart(itemCode, 1, item.price, item.name, item.size, item.variant, item.image)} 
                            className="text-gray-500 hover:text-pink-500 p-1 cursor-pointer"
                          >
                            <AiOutlinePlus className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="border-t border-gray-200 mt-6 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">${subTotal.toFixed(2)}</span>
                </div>

                <button className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition mt-4 flex items-center justify-center gap-2 cursor-pointer">
                  <BsFillBagCheckFill className="text-lg" />
                  Pay Amount ${subTotal.toFixed(2)}
                </button>

                <button 
                  onClick={clearCart} 
                  className="w-full border border-pink-500 text-pink-500 py-2 rounded hover:bg-pink-50 transition mt-2 cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;