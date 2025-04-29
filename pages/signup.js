import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [dob, setDob] = React.useState("")
  const [gender, setGender] = React.useState("")
  const [newsletter, setNewsletter] = React.useState(false)
    const router = useRouter()
  
  useEffect(() => {
      
      const token = localStorage.getItem('token')
      if(token){
        router.push('/')
      }
    }, [router])
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Validate email format
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(email)) {
        toast.error("Invalid email format");
        return;
      }
    
      // Validate phone number length
      if (phone.length !== 11) {
        toast.error("Phone number must be 11 digits");
        return;
      }
    
      const formData = { firstName, lastName, email, password, phone, dob, gender, newsletter };
    
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        // Check for valid JSON response
        let data;
        try {
          data = await response.json();
        } catch (err) {
          toast.error("Unexpected response from the server");
          return;
        }
    
        if (response.ok) {
          // Show success toast
          toast.success(data.message || "Account created successfully!", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
            onClose: () => {
              // Reset form
              setFirstName('');
              setLastName('');
              setEmail('');
              setPassword('');
              setPhone('');
              setDob('');
              setGender('');
              setNewsletter(false);
    
              // Redirect after toast closes
              router.push('/login');
            },
          });
        } else {
          toast.error(data.message || "Registration failed");
        }
      } catch (error) {
        console.error("Signup error:", error);
        toast.error("An error occurred during registration");
      }
    };
    

  return (
    <div>
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
              <Image width={40} height={40} src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-40 mb-8 mx-auto block" />
            </a>

            <div className="p-8 rounded-2xl bg-white shadow">
              <h2 className="text-slate-900 text-center text-3xl font-semibold">Create Account</h2>
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-800 text-sm font-medium mb-2 block">First Name</label>
                    <div className="relative flex items-center">
                      <input onChange={(e) => setFirstName(e.target.value)} name="firstName" type="text" required className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600" value={firstName} placeholder="Enter first name" />
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-800 text-sm font-medium mb-2 block">Last Name</label>
                    <div className="relative flex items-center">
                      <input onChange={(e) => setLastName(e.target.value)} name="lastName" type="text" required className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600" value={lastName} placeholder="Enter last name" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-slate-800 text-sm font-medium mb-2 block">Email</label>
                  <div onChange={(e) => setEmail(e.target.value)} className="relative flex items-center">
                    <input name="email" value={email} type="email" required className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter email" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="text-slate-800 text-sm font-medium mb-2 block">Password</label>
                  <div className="relative flex items-center">
                    <input onChange={(e) => setPassword(e.target.value)} name="password" value={password} type="password" required className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="text-slate-800 text-sm font-medium mb-2 block">Contact Number</label>
                  <div className="relative flex items-center">
                    <input onChange={(e) => setPhone(e.target.value)} name="phone" value={phone} type="tel" required className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter phone number" />
                  </div>
                </div>

                <div>
                  <label className="text-slate-800 text-sm font-medium mb-2 block">Date of Birth</label>
                  <div className="relative flex items-center">
                    <input value={dob} onChange={(e) => setDob(e.target.value)} name="dob" type="date" required className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600" />
                  </div>
                </div>

                <div>
                  <label className="text-slate-800 text-sm font-medium mb-2 block">Gender</label>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input checked={gender==="male"} onChange={(e) => setGender(e.target.value)} type="radio" name="gender" value="male" className="h-4 w-4 text-blue-600" />
                      <span className="ml-2 text-slate-800">Male</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input checked={gender==="female"} onChange={(e) => setGender(e.target.value)} type="radio" name="gender" value="female" className="h-4 w-4 text-blue-600" />
                      <span className="ml-2 text-slate-800">Female</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center">
                  <input id="newsletter" name="newsletter" type="checkbox" onChange={(e) => setNewsletter(e.target.checked)} checked={newsletter} className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" />
                  <label htmlFor="newsletter" className="ml-3 block text-sm text-slate-800">
                    Subscribe to our newsletter
                  </label>
                </div>

                <div className="!mt-8">
                  <button type="submit" className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                    Create Account
                  </button>
                </div>
                <p className="text-slate-800 text-sm !mt-6 text-center">
                  Already have an account?{' '}
                  <Link legacyBehavior href="/login" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                    <a>Sign in</a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup