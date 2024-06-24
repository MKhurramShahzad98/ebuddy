'use client';

import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAppDispatch, useAppSelector } from './hooks';
import { setToken } from '@/store/authSlice';
import { toast } from 'react-toastify';
import { fetchAllUsers } from '@/apis/userApi';
import UpdateUserModal from '@/components/UpdateUserModal';

export interface User {
  id: string;
  address: string;
  gender: string;
  name: string;
  email: string;
}

const HomePage: React.FC = () => {
  const router = useRouter();

  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [users, setUsers] = useState<User[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(setToken(token));
    } else {
      router.push('/login');
    }
  }, [dispatch, router]);

  const fetchUsers = useCallback(async () => {
    if (!token) {
      return;
    }

    try {
      const { data }: { data: User[] } = await fetchAllUsers(token);
      setUsers(data);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          'An error occurred while fetching users'
      );
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto p-4 lg:p-8 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {users.map((user) => (
          <div
            key={user.id}
            className='p-4 mb-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out'
          >
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-semibold text-gray-800'>
                {user.name}
              </h2>

              <button
                className='mt-4 inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-sm leading-snug shadow-sm'
                onClick={() => setSelectedUser(user)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                  />
                </svg>
              </button>
            </div>
            <p className='text-gray-600'>{user.email}</p>
            <p className='text-gray-600'>{user.address}</p>
          </div>
        ))}
      </div>

      {selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdate={fetchUsers}
        />
      )}
    </div>
  );
};

export default HomePage;
