import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Tshirts = () => {
  const products = [
    {
      src: 'https://m.media-amazon.com/images/I/7183mkggQYL._AC_SX569_.jpg',
      title: "True Classic Mens T-Shirts - Short Sleeve Crew Neck Plain Novelty T Shirt for Men",
      price: '27.99$',
    },
    {
      src: 'https://m.media-amazon.com/images/I/7183mkggQYL._AC_SX569_.jpg',
      title: "True Classic Mens T-Shirts - Short Sleeve Crew Neck Plain Novelty T Shirt for Men",
      price: '27.99$',
    },
    {
      src: 'https://m.media-amazon.com/images/I/7183mkggQYL._AC_SX569_.jpg',
      title: "True Classic Mens T-Shirts - Short Sleeve Crew Neck Plain Novelty T Shirt for Men",
      price: '27.99$',
    },
    {
      src: 'https://m.media-amazon.com/images/I/7183mkggQYL._AC_SX569_.jpg',
      title: "True Classic Mens T-Shirts - Short Sleeve Crew Neck Plain Novelty T Shirt for Men",
      price: '27.99$',
    },
    {
      src: 'https://m.media-amazon.com/images/I/7183mkggQYL._AC_SX569_.jpg',
      title: "True Classic Mens T-Shirts - Short Sleeve Crew Neck Plain Novelty T Shirt for Men",
      price: '27.99$',
    },
    {
      src: 'https://m.media-amazon.com/images/I/7183mkggQYL._AC_SX569_.jpg',
      title: "True Classic Mens T-Shirts - Short Sleeve Crew Neck Plain Novelty T Shirt for Men",
      price: '27.99$',
    },
    {
      src: 'https://m.media-amazon.com/images/I/7183mkggQYL._AC_SX569_.jpg',
      title: "True Classic Mens T-Shirts - Short Sleeve Crew Neck Plain Novelty T Shirt for Men",
      price: '27.99$',
    },
    {
      src: 'https://m.media-amazon.com/images/I/7183mkggQYL._AC_SX569_.jpg',
      title: "True Classic Mens T-Shirts - Short Sleeve Crew Neck Plain Novelty T Shirt for Men",
      price: '27.99$',
    },
  ];

  return (
    <div>
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          {products.map((item, index) => (
            <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Link href={`/product/${encodeURIComponent(item.title)}`} legacyBehavior>
                <a className="block cursor-pointer shadow-lg p-2">
                  <div className="relative h-[30vh] md:h-[36vh] w-full rounded overflow-hidden">
                    <Image
                      alt={item.title}
                      src={item.src}
                      layout="fill"
                      objectFit="cover"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Tshirts</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                    <p className="mt-1">{item.price}</p>
                    <p className="mt-1">S, M, L, XL, XXL</p>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);
};

export default Tshirts;