import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link href="/" legacyBehavior>
              <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                <Image src={"/logo.png"} width={40} height={40} alt="logo"/>
                <span className="ml-3 text-xl">Sandhu CodesWear</span>
              </a>
            </Link>
            <p className="mt-2 text-sm text-gray-500 px-4">
              Premium coding merchandise for developers
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                SHOP
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href="/tshirts" className="text-gray-600 hover:text-gray-800">
                    T-Shirts
                  </Link>
                </li>
                <li>
                  <Link href="/hoodies" className="text-gray-600 hover:text-gray-800">
                    Hoodies
                  </Link>
                </li>
                <li>
                  <Link href="/mugs" className="text-gray-600 hover:text-gray-800">
                    Mugs
                  </Link>
                </li>
                <li>
                  <Link href="/stickers" className="text-gray-600 hover:text-gray-800">
                    Stickers
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                SUPPORT
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-gray-800">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-gray-800">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-600 hover:text-gray-800">
                    FAQs
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                CONTACT US
              </h2>
              <nav className="list-none mb-10">
                <li className="text-gray-600 mb-2">
                  <span className="font-medium">Location:</span> Lahore, Punjab, Pakistan
                </li>
                <li className="text-gray-600 mb-2">
                  <span className="font-medium">Phone:</span> 042-9563256520
                </li>
                <li className="text-gray-600 mb-2">
                  <span className="font-medium">Email:</span> help@sandhucodeswear.com
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                OUR LOCATION
              </h2>
              <div className="h-48 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435519.2273814068!2d74.00473255689361!3d31.483103667512736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1746283682546!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Sandhu CodesWear - All rights reserved
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a href="#" className="text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="ml-3 text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1a10.66 10.66 0 01-9-5s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;