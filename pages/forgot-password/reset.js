import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Slide, ToastContainer, toast } from 'react-toastify'

const Reset = () => {
    const router = useRouter()
    const { email, resetToken } = router.query
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false) 
    const [showPassword, setShowPassword] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            router.push('/')
        }
    }, [router.query])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (password !== confirmPassword) {
            toast.error("Passwords don't match")
            return
        }
        
        setIsLoading(true)
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/forgot/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    newPassword: password,
                    resetToken
                })
            })

            const data = await response.json()

            if (!response.ok) {
                toast.error(data?.message || 'Password reset failed')
            }else{
              toast.success(data.message, {
                onClose: ()=> {
                    toast.info('Redirecting to login page...', {
                        autoClose: 2000,
                        onClose: () => {
                            router.push('/login')
                        }
                    })
                }
              })
            }

            
        } catch (error) {
            toast.error(error.message || 'Password reset failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <ToastContainer 
                position="top-left"
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
                        <a href="javascript:void(0)">
                            <Image 
                                width={10} 
                                height={10} 
                                src="https://readymadeui.com/readymadeui.svg" 
                                alt="logo" 
                                className="w-40 mb-8 mx-auto block" 
                            />
                        </a>

                        <div className="p-8 rounded-2xl bg-white shadow">
                            <h2 className="text-slate-900 text-center text-3xl font-semibold">
                                Create New Password
                            </h2>
                            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
                                <div>
                                    <label className="text-slate-800 text-sm font-medium mb-2 block">
                                        New Password
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                                            placeholder="Enter new password"
                                        />
                                        {!showPassword && <svg onClick={()=> setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                            <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                        </svg>}
                                        {showPassword && <svg onClick={()=> setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM64 40c36.465 0 58.747 27.234 59.617 28.787a4 4 0 0 1 0 3.426C122.747 73.766 100.465 101 64 101S5.253 73.766 4.383 72.213a4 4 0 0 1 0-3.426C5.253 67.234 27.535 40 64 40zm0 48c13.234 0 24-10.766 24-24S77.234 40 64 40 40 50.766 40 64s10.766 24 24 24z" data-original="#000000"></path>
  <path d="M64 56c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" data-original="#000000"></path>
</svg>}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-slate-800 text-sm font-medium mb-2 block">
                                        Confirm Password
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            name="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                                            placeholder="Confirm new password"
                                        />
                                        {!showConfirmPassword && <svg onClick={()=> setShowConfirmPassword(!showConfirmPassword)} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                            <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                        </svg>}
                                        {showConfirmPassword && <svg onClick={()=> setShowConfirmPassword(!showConfirmPassword)} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM64 40c36.465 0 58.747 27.234 59.617 28.787a4 4 0 0 1 0 3.426C122.747 73.766 100.465 101 64 101S5.253 73.766 4.383 72.213a4 4 0 0 1 0-3.426C5.253 67.234 27.535 40 64 40zm0 48c13.234 0 24-10.766 24-24S77.234 40 64 40 40 50.766 40 64s10.766 24 24 24z" data-original="#000000"></path>
  <path d="M64 56c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" data-original="#000000"></path>
</svg>}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || !password || !confirmPassword}
                                    className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                                >
                                    {isLoading ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reset