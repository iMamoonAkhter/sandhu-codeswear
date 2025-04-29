// pages/404.js
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function NotFound() {
  const router = useRouter()

  // Optional: Redirect to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">
        {`The page you're looking for doesn't exist.`}
      </p>
      <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Return Home
      </Link>
      <p className="mt-4 text-gray-500">
        {`(You'll be automatically redirected in 5 seconds)`}
      </p>
    </div>
  )
}