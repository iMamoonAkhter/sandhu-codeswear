import ChangePassword from '@/components/ChangePassword';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiUser, FiTruck, FiLock, FiMail, FiPhone, FiCalendar, FiBell } from 'react-icons/fi';
import { IoMdMale, IoMdFemale } from 'react-icons/io';
import { Slide, toast, ToastContainer } from 'react-toastify';

const PasswordPage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({});
  const navigateTo = (path) => {
    router.push(`/account/${path}`);
  };

  useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserInfo(user);
      }
  
      if (!localStorage.getItem('token')) {
        router.push('/login');
      }
    }, [router]);

  const isActive = (path) => {
    return router.pathname === `/account/${path}` || 
          (router.pathname === '/account' && path === '');
  };

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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">My Account</h2>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => navigateTo('')}
                      className={`w-full flex cursor-pointer items-center px-4 py-3 rounded-lg ${isActive('') ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <FiUser className="mr-3" />
                      Account Details
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateTo('delivery-details')}
                      className={`w-full flex items-center px-4 cursor-pointer py-3 rounded-lg ${isActive('delivery-details') ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <FiTruck className="mr-3" />
                      Delivery Details
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateTo('change-password')}
                      className={`w-full flex items-center px-4 cursor-pointer py-3 rounded-lg ${isActive('change-password') ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <FiLock className="mr-3" />
                      Change Password
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mt-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {userInfo?.firstName?.charAt(0)}{userInfo?.lastName?.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {userInfo?.firstName} {userInfo?.lastName}
                </h3>
                <div className="mt-4 text-sm text-gray-600 space-y-2 w-full">
                  <div className="flex items-center">
                    <FiMail className="text-gray-400 mr-3" />
                    <span>{userInfo?.email}</span>
                  </div>
                  {userInfo?.phone && (
                    <div className="flex items-center">
                      <FiPhone className="text-gray-400 mr-3" />
                      <span>{userInfo?.phone}</span>
                    </div>
                  )}
                  {userInfo?.gender && (
                    <div className="flex items-center">
                      {userInfo.gender === 'male' ? (
                        <IoMdMale className="text-blue-400 mr-3" />
                      ) : (
                        <IoMdFemale className="text-pink-400 mr-3" />
                      )}
                      <span className="capitalize">{userInfo.gender}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <FiBell className="text-gray-400 mr-3" />
                    <span>Newsletter: {userInfo?.newsletter ? 'On' : 'Off'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full md:w-3/4">
            <ChangePassword />
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordPage;