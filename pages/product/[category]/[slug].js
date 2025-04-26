import Image from "next/image";
import React, { useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Slug = ({ product, addToCart, BuyNow }) => {
  const [pin, setPin] = React.useState();
  const [service, setService] = React.useState(null);
  const [selectedColor, setSelectedColor] = React.useState(product.color[0]);
  const [selectedSize, setSelectedSize] = React.useState(product.size[0]);
  useEffect(() => {
    const fetchPinService = async () => {
      try {
        const pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        const pinJson = await pins.json();
        setService(pinJson.includes(parseInt(pin)));
      } catch (error) {
        console.error("Error fetching pincode service:", error);
        toast.error("Zip code service unavailable at the moment.Please try again later.");
      }
    };
    fetchPinService();
  }, [pin]);
  
  const checkServiceAbility = async () => {
    
    if(service === true){
      toast.success("Yay! This pincode is serviceable")
    }else{
      toast.error("Sorry! We do not deliver to this pincode yet")
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };
 
  return (
    <>
    <ToastContainer position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce} />
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
                <button className="flex ml-8 text-white bg-pink-500 border-0 py-2 md:px-6 px-2 focus:outline-none hover:bg-pink-600 rounded"  onClick={() => BuyNow(product, selectedSize, selectedColor)}>
                  Buy Now
                </button>
                <button
                  className="flex ml-4 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded"
                  onClick={() => {
                    
                    addToCart(
                      product._id,
                      product.slug,
                      1,
                      product.price,
                      product.title,
                      product.category,
                      selectedSize,
                      selectedColor,
                      product.img
                    );
                  }}
                  
                >
                  Add to Cart
                </button>
              </div>

              {/* Pincode */}
              <div className="pin mt-6 flex space-x-2 text-sm">
                <input
                  onChange={onChangePin}
                  className="px-2 border-2 border-gray-400 rounded-md"
                  type="text"
                  placeholder="Enter your Pincode"
                />
                <button
                  className="text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded cursor-pointer"
                  onClick={checkServiceAbility}
                >
                  Check
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

  const product = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/products/${category}/${slug}`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product: product.product },
  };
}

export default Slug;
