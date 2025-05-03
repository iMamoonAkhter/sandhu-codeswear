import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import {
  AiFillCloseCircle,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const ref = useRef();
  
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  const checkoutRoute = () => {
    if(!localStorage.getItem('token')){
      alert("Please login to continue");
      router.push('/login');
      return;
    }
    router.push("/checkout");
  }


  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center py-2 shadow-md sticky top-0 bg-white z-50">
      {/* Logo */}
      <div className="logo md:mr-5 mr-auto mx-5">
        <Link href={"/"}>
          <Image width={100} height={40} src="/logo.png" alt="Logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="nav">
        <ul className="flex items-center space-x-6 font-bold md:text-md ">
          <Link href={"/tshirts"}>
            <li className="hover:text-pink-500 transition cursor-pointer">
              Tshirts
            </li>
          </Link>
          <Link href={"/hoodies"}>
            <li className="hover:text-pink-500 transition cursor-pointer">
              Hoodies
            </li>
          </Link>
          <Link href={"/stickers"}>
            <li className="hover:text-pink-500 transition cursor-pointer">
              Stickers
            </li>
          </Link>
          <Link href={"/mugs"}>
            <li className="hover:text-pink-500 transition cursor-pointer">
              Mugs
            </li>
          </Link>
        </ul>
      </div>

      {/* Cart Icon */}
      <div className="cart absolute right-0 top-4 mx-5 flex items-center gap-3">
        {/* Account Icon - Independent Hover */}
        <div className="cursor-pointer hover:text-pink-500 transition">
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            {user.value && (
              <MdAccountCircle className="text-xl md:text-2xl hover:text-pink-500 transition" />
            )}

            {dropdown && (
              <div className="absolute right-0 top-6 w-40 bg-white shadow-md rounded-md py-2 z-50">
                <ul className="text-sm text-gray-700">
                  <Link href="/account">
                    <li className="px-4 py-2 hover:bg-pink-100">My Account</li>
                  </Link>
                  <hr />
                  <Link href="/orders">
                    <li className="px-4 py-2 hover:bg-pink-100">Orders</li>
                  </Link>
                  <hr />
                  <button
  className="hover:bg-pink-100 w-full text-left px-4 py-2 transition cursor-pointer"
  onClick={logout}
>
  Logout
</button>

                  <hr />
                </ul>
              </div>
            )}
          </div>

          {!user.value && (
            <Link href={"/login"} legacyBehavior>
              <a>
                <button className="cursor-pointer bg-pink-600 px-2 py-2 rounded-md text-sm text-white mx-2">
                  Login
                </button>
              </a>
            </Link>
          )}
        </div>

        {/* Cart Icon - With Cart Count Badge */}
        <div
          onClick={toggleCart}
          className="relative cursor-pointer hover:text-pink-500 transition"
        >
          <AiOutlineShoppingCart className="text-xl md:text-2xl" />
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {Object.keys(cart).reduce((total, key) => total + cart[key].qty, 0)}
          </span>
        </div>
      </div>

      {/* Cart Sidebar */}
      <div
        ref={ref}
        className="w-80 h-full sideCart fixed top-0 right-0 bg-white px-6 py-8 transition-transform duration-300 transform translate-x-full shadow-xl overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-2xl">Your Cart</h2>
          <button
            onClick={toggleCart}
            className="text-gray-500 hover:text-pink-500 transition cursor-pointer"
          >
            <AiFillCloseCircle className="text-2xl" />
          </button>
        </div>

        {Object.keys(cart).length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Your cart is empty</p>
            <Link href={"/"}>
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
                      <p className="text-sm text-gray-500">
                        Color: {item.variant}
                      </p>
                      <p className="text-pink-500 font-bold mt-1">
                        ${Number(item.price).toFixed(2)}
                      </p>

                      {/* Quantity Buttons */}
                      <div className="flex items-center mt-2">
  <button
    onClick={() => removeFromCart(itemCode, 1)}
    className="text-gray-500 hover:text-pink-500 p-1 cursor-pointer"
    title={Number(item.qty) >= Number(item.availableQty) ? "Maximum quantity reached" : ""}
  >
    <AiOutlineMinus className="text-sm" />
  </button>
  
  <span className="mx-2 text-gray-700">
    {Number(item.qty) || 1}
  </span>
  
  <button
    onClick={() => {
      const [slug, size, variant] = itemCode.split("~~");
      addToCart(
        item.id,
        slug,
        1,
        item.price,
        item.name,
        item.category,
        size,
        variant,
        item.image,
        item.availableQty
      );
    }}
    disabled={Number(item.qty) >= Number(item.availableQty)}
    className={`p-1 ${
      Number(item.qty) >= Number(item.availableQty)
        ? 'opacity-50 cursor-not-allowed text-gray-400'
        : 'cursor-pointer text-gray-500 hover:text-pink-500'
    }`}
  >
    <AiOutlinePlus className="text-sm" />
  </button>
</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtotal & Actions */}
            <div className="border-t border-gray-200 mt-6 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold">
                  ${Number(subTotal).toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <Link onClick={checkoutRoute}>
                <button className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition mt-4 flex items-center justify-center gap-2 cursor-pointer">
                  <BsFillBagCheckFill className="text-lg" />
                  Checkout
                </button>
              </Link>

              {/* Clear Cart Button */}
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
  );
};

export default Navbar;
