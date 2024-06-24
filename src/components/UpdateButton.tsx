'use client';

import { useAppDispatch } from '@/app/hooks';
import { updateUser } from '@/apis/userApi';
import { useEffect, useState } from 'react';

const UpdateButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleClick = async () => {
    if (!token) {
      console.error('No token found');
      return;
    }
    const userId = 'user-id';
    const data = { name: 'New Name' };
    try {
      const response = await updateUser(token, userId, data);
      console.log(response.data);
    } catch (error) {
      console.error('Failed to update user data', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    >
      Update User Data
    </button>
  );
};

export default UpdateButton;
