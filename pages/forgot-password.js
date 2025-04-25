import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const ForgotPassword = () => {
  const router = useRouter()
  useEffect(() => {
      
      const token = localStorage.getItem('token')
      if(token){
        router.push('/')
      }
    }, [])
  return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <a href="javascript:void(0)">
            <Image width={40} height={20} src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-40 mb-8 mx-auto block" />
          </a>

          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-slate-900 text-center text-3xl font-semibold">Reset Password</h2>
            <form className="mt-12 space-y-6">
              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">Email Address</label>
                <div className="relative flex items-center">
                  <input name="email" type="email" required className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter your email" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>

              <div className="!mt-12">
                <Link legacyBehavior href={'/forgot-password/verify-token'}><a><button type="button" className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                  Send Reset Link
                </button></a></Link>
              </div>
              <p className="text-slate-800 text-sm !mt-6 text-center">
                Remember your password?{' '}
                <Link legacyBehavior href="/login" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold cursor-pointer">
                  <a>Sign in</a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword