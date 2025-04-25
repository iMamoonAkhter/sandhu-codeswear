import React from "react";
import Image from "next/image";
import Link from "next/link";

const Stickers = ({ product }) => {
  
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {product.products.map((item) => {
              return <div key={item._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <Link
                  passHref={true}
                  href={`/product/${encodeURIComponent(item.category)}/${encodeURIComponent(item.slug)}`}
                  legacyBehavior
                >

                  <a className="block cursor-pointer shadow-lg p-2">
                    {item.availableQty < 1 && <span className="absolute z-10 bg-red-600 p-1 font-bold text-white mt-1">Out of Stock</span>}
                    <div className="relative h-[30vh] md:h-[36vh] w-full rounded overflow-hidden">
                      <Image
                        alt={item.title}
                        src={item.img}
                        layout="fill"
                        objectFit="cover"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {item.category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {item.title.slice(0,35)} ...
                      </h2>
                      <p className="mt-1">${item.price}</p>
                      {item.size &&
                        item.size.map((size, i) => (
                          <span key={i}>
                            {size}
                            {i !== item.size.length - 1 ? ", " : ""}
                          </span>
                        ))}
                    </div>
                  </a>
                </Link>
              </div>
})}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/products/stickers`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product: JSON.parse(JSON.stringify(product)) }, // will be passed to the page component as props
  };
}

export default Stickers;
