import NotFoundPage from "@/components/NotFound";
import Image from "next/image";
import React, { useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Slug = ({ product, addToCart, BuyNow, cart, notFound }) => {
  const [selectedColor, setSelectedColor] = React.useState(product?.color[0]);
  const [selectedSize, setSelectedSize] = React.useState(product?.size[0]);
  if (notFound) {
    return <NotFoundPage />
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full flex justify-center items-center">
              <Image
                alt={product.title}
                className="w-64 h-auto object-cover rounded"
                src={product.img}
                width={250}
                height={250}
              />
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                SANDHU CODESWEAR
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>

              <p className="leading-relaxed">{product.desc}</p>

              {/* Color Options */}
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex items-center">
                  <span className="mr-3">Color</span>
                  {product.color.map((c, index) => (
                    <button
                      key={index}
                      className={`border-2 ml-1 rounded-full w-6 h-6 focus:outline-none ${
                        selectedColor === c ? "border-black" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: c.toLowerCase() }}
                      onClick={() => setSelectedColor(c)}
                    ></button>
                  ))}
                </div>

                {/* Size Selector */}
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
                    >
                      {product.size.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.price}
                </span>
                <button
                  disabled={
                    !selectedSize ||
                    !selectedColor ||
                    cart[`${product.slug}~~${selectedSize}~~${selectedColor}`]
                      ?.qty >= product.availableQty
                  }
                  className={`bg-pink-500 text-white px-4 py-2 rounded ml-2 mr-2 ${
                    !selectedSize ||
                    !selectedColor ||
                    cart[`${product.slug}~~${selectedSize}~~${selectedColor}`]
                      ?.qty >= product.availableQty
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-pink-600 cursor-pointer"
                  }`}
                  onClick={() => BuyNow(product, selectedSize, selectedColor)}
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    if (selectedSize && selectedColor) {
                      addToCart(
                        product._id,
                        product.slug,
                        1,
                        product.price,
                        product.title,
                        product.category,
                        selectedSize,
                        selectedColor,
                        product.img,
                        product.availableQty
                      );
                    } else {
                      alert("Please select size and color");
                    }
                  }}
                  disabled={
                    !selectedSize ||
                    !selectedColor ||
                    cart[`${product.slug}~~${selectedSize}~~${selectedColor}`]
                      ?.qty >= product.availableQty
                  }
                  className={`bg-pink-500 text-white px-4 py-2 rounded ${
                    !selectedSize ||
                    !selectedColor ||
                    cart[`${product.slug}~~${selectedSize}~~${selectedColor}`]
                      ?.qty >= product.availableQty
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-pink-600 cursor-pointer"
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


export async function getServerSideProps(context) {
  const { category, slug } = context.params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/products/${category}/${slug}`
    );
    
    // If response is not OK (404, 500 etc.)
    if (!res.ok) {
      return {
        props: {
          notFound: true
        }
      };
    }

    const data = await res.json();
    
    // If product doesn't exist in response
    if (!data.product) {
      return {
        props: {
          notFound: true
        }
      };
    }

    return {
      props: { 
        product: data.product,
        notFound: false 
      },
    };
  } catch (error) {
    // If any error occurs during fetching
    return {
      props: {
        notFound: true
      }
    };
  }
}

export default Slug;