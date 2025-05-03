import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Slide, ToastContainer, toast } from 'react-toastify'

const VerifyToken = () => {
    const router = useRouter()
    const { email } = router.query
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [isLoading, setIsLoading] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const [countdown, setCountdown] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            router.push('/')
        }
    }, [router])

    useEffect(() => {
        let timer
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000)
        }
        return () => clearTimeout(timer)
    }, [countdown])

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        
        // Auto focus to next input
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        try {
            const otpCode = otp.join('')
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/forgot/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    otp: otpCode
                })
            })

            const data = await response.json()

            if (!response.ok) {
                toast.error(data?.message || 'Invalid OTP')
            } else {
              toast.success(data.message, {
                onClose: () => {
                    toast.info('Redirecting to reset password page...', {
                        autoClose: 2000,
                        onClose: () => {
                            router.push({
                                pathname: '/forgot-password/reset',
                                query: { 
                                    email,
                                    resetToken: data.resetToken 
                                }
                            })
                        }
                    })
                }
              })
            }
        } catch (error) {
            toast.error(error.message || 'Invalid OTP')
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendOTP = async () => {
        if (countdown > 0) return
        
        setResendLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/forgot/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data?.message || 'Failed to resend OTP')
            }

            toast.success('OTP resent successfully!')
            setCountdown(60) // 60 seconds countdown
        } catch (error) {
            toast.error(error.message || 'Failed to resend OTP')
        } finally {
            setResendLoading(false)
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
                        <Image 
                            src="/logo.png" 
                            width={40} 
                            height={40} 
                            alt="logo" 
                            className="w-40 mb-8 mx-auto block" 
                        />
                    
                        <div className="p-8 rounded-2xl bg-white shadow">
                            <h2 className="text-slate-900 text-center text-3xl font-semibold">
                                Verify Your Email
                            </h2>
                            <div className="mt-12 space-y-6 text-center">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-16 w-16 text-green-500 mx-auto" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                                    />
                                </svg>
                                <p className="text-slate-800">
                                    {`We've sent a verification code to ${email}`}
                                </p>
                                
                                <div className="flex justify-center space-x-2">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            className="w-10 h-12 text-center text-xl border border-slate-300 rounded-md focus:outline-blue-600"
                                        />
                                    ))}
                                </div>

                                <div className="!mt-8">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isLoading || otp.some(d => d === '')}
                                        className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                                    >
                                        {isLoading ? 'Verifying...' : 'Verify Code'}
                                    </button>
                                </div>
                                <p className="text-slate-800 text-sm !mt-6">
                                    {`Didn't receive code?`}{' '}
                                    <button 
                                        onClick={handleResendOTP}
                                        disabled={resendLoading || countdown > 0}
                                        className="text-blue-600 hover:underline font-semibold cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {resendLoading ? 'Sending...' : 
                                         countdown > 0 ? `Resend in ${countdown}s` : 'Resend'}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerifyToken