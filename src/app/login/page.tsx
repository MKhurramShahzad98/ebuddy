'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/apis/userApi';
import Link from 'next/link';
import { setToken } from '@/store/authSlice';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../hooks';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { data, status } = await login(email, password);
      if (data?.customToken && status === 200) {
        dispatch(setToken(data.customToken));
        localStorage.setItem('token', data.customToken);
        toast.success('Login successful');
        router.push('/');
      } else {
        toast.error('Login failed');
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-sm mx-auto my-10'>
      <h1 className='text-4xl text-center font-bold mb-5'>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={isLoading} type='submit'>
          Login
        </Button>
      </form>
      <div className='text-center mt-4'>
        <Link
          href='/signup'
          className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
