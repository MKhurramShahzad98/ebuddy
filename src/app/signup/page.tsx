'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { signUp } from '@/apis/userApi';
import Link from 'next/link';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { toast } from 'react-toastify';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const { data }: { data: { message: string; userId: string } } =
        await signUp(email, password);
      toast.success(data.message);
      router.push('/login');
    } catch (err: any) {
      toast.error(err.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-sm mx-auto my-10'>
      <h1 className='text-4xl text-center font-bold mb-5'>Sign Up</h1>
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
          Sign Up
        </Button>
      </form>
      <div className='text-center mt-4'>
        <Link
          href='/login'
          className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
