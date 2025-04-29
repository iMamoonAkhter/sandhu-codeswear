import { useState, useEffect } from 'react';
import { FiEdit, FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';

const DeliveryDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deliveryData, setDeliveryData] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'Pakistan',
    email: ''
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    const storedEmail = JSON.parse(user)?.email;
    if (storedEmail) {
      setDeliveryData(prev => ({ ...prev, email: storedEmail }));
    }
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setDeliveryData(prev => ({ ...prev, [name]: value }));

    if (name === 'pincode' && value.length === 5) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pincode: value }),
        });

        const data = await res.json();

        if (res.ok && data.city && data.state) {
          setDeliveryData(prev => ({
            ...prev,
            city: data.city,
            state: data.state,
            country: data.country || 'Pakistan',
          }));
          toast.success('Pincode is valid. City and state auto-filled.');
        } else {
          toast.error('Pincode is not available');
          setDeliveryData(prev => ({
            ...prev,
            city: '',
            state: '',
            country: 'Pakistan',
          }));
        }
      } catch (error) {
        toast.error('Failed to validate pincode');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // Check pincode validity again before updating
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pincode: deliveryData.pincode }),
      });

      const data = await res.json();

      if (!res.ok || !data.city || !data.state) {
        toast.error('Pincode is not available. Cannot update.');
        setIsUpdating(false);
        return;
      }

      // Proceed with update
      const updateRes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/delivery/update-delivery`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deliveryData)
      });

      if (!updateRes.ok) {
        throw new Error('Failed to update delivery details');
      }

      setIsEditing(false);
      toast.success('Delivery details updated successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Delivery Details</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-pink-500 hover:text-pink-600"
          >
            <FiEdit className="mr-1" />
            Edit Details
          </button>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              value={deliveryData.address}
              onChange={handleChange}
              disabled={!isEditing}
              rows={3}
              className={`w-full px-4 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={deliveryData.city}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                value={deliveryData.state}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                name="pincode"
                value={deliveryData.pincode}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={deliveryData.country}
              onChange={handleChange}
              disabled
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
            />
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

export default DeliveryDetails;
