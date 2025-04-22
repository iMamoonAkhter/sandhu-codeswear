import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const VerifyToken = () => {
  return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
            <Image src="https://readymadeui.com/readymadeui.svg" width={40} height={40} alt="logo" className="w-40 mb-8 mx-auto block" />
          

          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-slate-900 text-center text-3xl font-semibold">Verify Your Email</h2>
            <div className="mt-12 space-y-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-slate-800">{`We've sent a verification code to your email address.`}</p>
              
              <div className="flex justify-center space-x-2">
                {[1,2,3,4,5,6].map((item) => (
                  <input key={item} type="text" maxLength="1" className="w-10 h-12 text-center text-xl border border-slate-300 rounded-md focus:outline-blue-600" />
                ))}
              </div>

              <div className="!mt-8">
                <Link legacyBehavior href={'/forgot-password/reset'}><a><button type="button" className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                  Verify Code
                </button></a></Link>
              </div>
              <p className="text-slate-800 text-sm !mt-6">
                {`Didn't receive code?`}{' '}
                <button className="text-blue-600 hover:underline font-semibold cursor-pointer">
                  Resend
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyToken