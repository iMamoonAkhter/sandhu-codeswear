import { useEffect, useState } from 'react';
import { FiEdit, FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AccountDetails = ({ userInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
    gender: 'male',
    newsletter: false
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        phone: userInfo.phone || '',
        dob: userInfo.dob ? userInfo.dob.split('T')[0] : '',
        gender: userInfo.gender || 'male',
        newsletter: userInfo.newsletter || false
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      // API call to update user
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/updateUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Account Details</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-pink-500 hover:text-pink-600"
          >
            <FiEdit className="mr-1" />
            Edit Profile
          </button>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                disabled={!isEditing}
                className="h-4 w-4 text-pink-500 border-gray-300 rounded"
              />
              <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
                Subscribe to newsletter
              </label>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isUpdating}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 flex items-center"
            >
              <FiSave className="mr-1" />
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AccountDetails;