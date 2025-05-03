import React, { useState } from 'react'
import Head from 'next/head'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import Link from 'next/link'

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. All payments are processed securely through our encrypted payment gateway."
    },
    {
      question: "How long does shipping take?",
      answer: "Most orders are processed within 1-2 business days. Domestic shipping typically takes 3-5 business days, while international shipping may take 7-14 business days depending on your location."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide! Shipping costs and delivery times vary by country. You'll see the exact shipping costs at checkout before you complete your purchase."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day money-back guarantee. Items must be unused and in their original packaging with tags attached. Please contact our support team to initiate a return."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account on our website."
    },
    {
      question: "What if my item arrives damaged?",
      answer: "We're sorry to hear that! Please contact us within 7 days of delivery with photos of the damaged item and packaging. We'll send a replacement or issue a full refund."
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes! We offer special pricing for orders of 10+ items. Please contact our sales team at sales@sandhucodeswear.com for more information."
    },
    {
      question: "How do I care for my CodesWear apparel?",
      answer: "For best results, wash in cold water and tumble dry low. Turn graphic items inside out before washing. Avoid using bleach or ironing directly on printed designs."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FAQs - Sandhu CodesWear</title>
        <meta name="description" content="Frequently asked questions about Sandhu CodesWear products and services" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">{`Can't find what you're looking for?`} <Link href={"/contact"} className="text-pink-500 hover:underline" legacyBehavior><a>Contact our support team</a></Link></p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none cursor-pointer "
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-${index}`}
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{faq.question}</h2>
                {activeIndex === index ? (
                  <FiChevronUp className="text-pink-500 text-xl" />
                ) : (
                  <FiChevronDown className="text-pink-500 text-xl" />
                )}
              </button>
              <div
                id={`faq-${index}`}
                className={`px-6 pb-6 pt-0 transition-all duration-300 ease-in-out ${activeIndex === index ? 'block' : 'hidden'}`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-pink-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-6">Our customer support team is happy to help with any other questions you might have.</p>
          <Link 
            href="/contact" 
            legacyBehavior
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            <a>Contact Support</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Faq