import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { AiFillCloseCircle, AiOutlinePlus, AiOutlineMinus, AiOutlineShoppingCart } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const ref = useRef()

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full")
      ref.current.classList.add("translate-x-0")
    } else {
      ref.current.classList.remove("translate-x-0")
      ref.current.classList.add("translate-x-full")
    }
  }

  return (
    <div className='flex flex-col md:flex-row justify-center md:justify-start items-center py-2 shadow-md sticky top-0 bg-white z-50'>

      {/* Logo */}
      <div className="logo mx-5">
        <Link href={'/'}>
          <Image width={100} height={40} src="/home.jpg" alt="Logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="nav">
        <ul className='flex items-center space-x-6 font-bold md:text-md'>
          <Link href={'/tshirts'}><li className='hover:text-pink-500 transition cursor-pointer'>Tshirts</li></Link>
          <Link href={'/hoodies'}><li className='hover:text-pink-500 transition cursor-pointer'>Hoodies</li></Link>
          <Link href={'/stickers'}><li className='hover:text-pink-500 transition cursor-pointer'>Stickers</li></Link>
          <Link href={'/mugs'}><li className='hover:text-pink-500 transition cursor-pointer'>Mugs</li></Link>
        </ul>
      </div>

      {/* Cart Icon */}
      <div onClick={toggleCart} className="cart absolute right-0 top-4 mx-5 cursor-pointer group">
        <div className="relative">
          <AiOutlineShoppingCart className='text-xl md:text-2xl group-hover:text-pink-500 transition' />
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {Object.keys(cart).reduce((total, key) => total + cart[key].qty, 0)}
          </span>
        </div>
      </div>

      {/* Cart Sidebar */}
      <div ref={ref} className="w-80 h-full sideCart fixed top-0 right-0 bg-white px-6 py-8 transition-transform duration-300 transform translate-x-full shadow-xl overflow-y-auto">

        <div className="flex justify-between items-center mb-6">
          <h2 className='font-bold text-2xl'>Your Cart</h2>
          <button onClick={toggleCart} className="text-gray-500 hover:text-pink-500 transition cursor-pointer">
            <AiFillCloseCircle className='text-2xl' />
          </button>
        </div>

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
            <div className="divide-y divide-gray-200">
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
                      <p className="text-pink-500 font-bold mt-1">${item.price.toFixed(2)}</p>

                      {/* Quantity Buttons */}
                      <div className="flex items-center mt-2">
                        <button onClick={() => removeFromCart(itemCode, 1, item.price, item.name, item.size, item.variant, item.image)} className="text-gray-500 hover:text-pink-500 p-1 cursor-pointer">
                          <AiOutlineMinus className="text-sm" />
                        </button>
                        <span className="mx-2 text-gray-700">{item.qty}</span>
                        <button onClick={() => addToCart(itemCode, 1, item.price, item.name, item.size, item.variant, item.image)} className="text-gray-500 hover:text-pink-500 p-1 cursor-pointer">
                          <AiOutlinePlus className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Subtotal & Actions */}
            <div className="border-t border-gray-200 mt-6 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold">${subTotal.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <Link href={'/checkout'}><button className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition mt-4 flex items-center justify-center gap-2 cursor-pointer">
                <BsFillBagCheckFill className="text-lg" />
                Checkout
              </button></Link>

              {/* Clear Cart Button */}
              <button onClick={clearCart} className="w-full border border-pink-500 text-pink-500 py-2 rounded hover:bg-pink-50 transition mt-2 cursor-pointer">
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
