import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  // Check for existing token on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      router.push('/')
    }
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
  
      // First check if the response is OK (status 200-299)
      if (!response.ok) {
        // If not OK, try to get error message from response
        let errorMessage = 'Invalid credentials'
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          // If we can't parse JSON, use status text
          errorMessage = response.statusText || errorMessage
        }
        toast.error(errorMessage)
        return
      }
  
      // If response is OK, parse JSON
      const data = await response.json()
      
      if (data.success) {
        toast.success("Login Successful")
        localStorage.setItem('token', data.token)
        if(localStorage.getItem('token')){
          router.push('/')
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during login")
      console.error("Login error:", error)
    } finally {
      setEmail('')
      setPassword('')
    }
  }
  
  return (
    <div>
      <ToastContainer position="top-left"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Slide}
      />
      <div className="bg-gray-50">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <a href="javascript:void(0)"><Image
            src="/logo.png" alt="logo" width={40} height={40} className="w-40 mb-8 mx-auto block" />
          </a>

          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-slate-900 text-center text-3xl font-semibold">Sign in</h2>
            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input name="email" value={email} onChange={(e) => setEmail(e.target.value)}  type="text" required className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter Email" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>

              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter Password" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" />
                  <label for="remember-me" className="ml-3 block text-sm text-slate-800">
                    Remember me
                  </label>
                </div>
                <div className="text-sm cursor-pointer">
                  <Link href="/forgot-password" legacyBehavior className="text-blue-600 hover:underline font-semibold">
                    <a>Forgot your password?</a>
                  </Link>
                </div>
              </div>

              <div className="!mt-12">
                <button type="submit" className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                  Sign in
                </button>
              </div>
              <p className="text-slate-800 text-sm !mt-6 text-center">{`Don't have an account?`} <Link legacyBehavior href="/signup" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold cursor-pointer"><a>Register here</a></Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login
