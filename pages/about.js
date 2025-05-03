import React from 'react'
import Head from 'next/head'
import { FiTruck, FiShield, FiAward, FiHeart, FiCode } from 'react-icons/fi'
import Image from 'next/image'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About Us - Sandhu CodesWear</title>
        <meta name="description" content="Learn about Sandhu CodesWear - Premium coding merchandise for developers" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Sandhu CodesWear</h1>
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto">
            Where Code Meets Fashion - Premium Apparel for Developers
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023, Sandhu CodesWear began as a passion project between a group of developers who wanted to wear their love for coding. 
                We noticed a lack of high-quality, stylish apparel that truly represented developer culture.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small online store selling a few t-shirt designs has grown into a premier destination for coding-themed merchandise. 
                Today, we serve thousands of developers worldwide with our unique collection of apparel and accessories.
              </p>
              <p className="text-gray-600">
                Our mission is simple: create products that developers love to wear, with designs that speak to the coding community.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                width={300}
                height={300} 
                src="/developer.jpg" 
                alt="Developer team working"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-pink-500 mb-4">
                <FiCode className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">By Developers, For Developers</h3>
              <p className="text-gray-600">
                All our designs are created by developers who understand what matters to the community. 
                We don{"'"}t just make generic tech shirts - we create apparel that resonates with real coders.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-pink-500 mb-4">
                <FiAward className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality First</h3>
              <p className="text-gray-600">
                We use only premium materials that stand up to daily wear. Our products are made to last, 
                with attention to detail in every stitch and print.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-pink-500 mb-4">
                <FiHeart className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Focused</h3>
              <p className="text-gray-600">
                We actively engage with the developer community to create designs that matter. 
                A portion of every sale goes to support coding education initiatives.
              </p>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">What We Offer</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FiTruck className="text-pink-500 mr-3" />
                  Fast Shipping
                </h3>
                <p className="text-gray-600">
                  We process orders within 24 hours and offer worldwide shipping. Most orders arrive within 3-5 business days.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FiShield className="text-pink-500 mr-3" />
                  Satisfaction Guarantee
                </h3>
                <p className="text-gray-600">
                  Not happy with your purchase? We offer a 30-day money-back guarantee on all products, no questions asked.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FiCode className="text-pink-500 mr-3" />
                  Exclusive Designs
                </h3>
                <p className="text-gray-600">
                  Our designs are exclusive to Sandhu CodesWear. You won{"'"}t find these unique coding-themed products anywhere else.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section>
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Meet The Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Mamoon Akhter",
                role: "Founder & Lead Developer",
                bio: "Full-stack developer with 10+ years experience. Creates most of our initial designs.",
                img: "/Mamoon.jpg"
              },
             
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  width={300}
                  height={300} 
                  src={member.img} 
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-pink-500 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default About