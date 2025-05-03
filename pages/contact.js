import React from 'react'
import Head from 'next/head'
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Contact Us - Sandhu CodesWear</title>
        <meta name="description" content="Get in touch with Sandhu CodesWear" />
      </Head>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Contact Us</h1>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Information - Stacks on mobile */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Our Information</h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start">
                <FiMapPin className="text-pink-500 text-lg sm:text-xl mt-0.5 mr-3 sm:mr-4" />
                <div>
                  <h3 className="font-medium text-base sm:text-lg">Location</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Lahore, Punjab, Pakistan</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiPhone className="text-pink-500 text-lg sm:text-xl mt-0.5 mr-3 sm:mr-4" />
                <div>
                  <h3 className="font-medium text-base sm:text-lg">Phone</h3>
                  <p className="text-gray-600 text-sm sm:text-base">042-9563256520</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiMail className="text-pink-500 text-lg sm:text-xl mt-0.5 mr-3 sm:mr-4" />
                <div>
                  <h3 className="font-medium text-base sm:text-lg">Email</h3>
                  <p className="text-gray-600 text-sm sm:text-base">help@sandhucodeswear.com</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map - Full width on mobile */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Our Location</h2>
            <div className="h-48 sm:h-64 w-full rounded-lg overflow-hidden">
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
    </div>
  )
}

export default Contact