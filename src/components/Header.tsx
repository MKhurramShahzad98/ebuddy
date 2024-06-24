'use client';
import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/app/hooks';

const AppBarButton: React.FC<{ href: string; label: string }> = ({
  href,
  label,
}) => (
  <Link
    href={href}
    className='text-white text-sm font-medium px-3 py-2 lg:px-4 lg:py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 ease-in-out'
  >
    {label}
  </Link>
);

const AppBar: React.FC<{ token: string | null }> = ({ token }) => (
  <div className='bg-gray-800 shadow-md flex justify-between items-center p-4 lg:p-6'>
    <span className='text-lg lg:text-xl text-white font-semibold'>My APP</span>
    <div className='space-x-2'>
      {!token ? (
        <>
          <AppBarButton href='/signup' label='Signup' />
          <AppBarButton href='/login' label='Login' />
        </>
      ) : null}
    </div>
  </div>
);

export default function Header() {
  const { token } = useAppSelector((state) => state.auth);

  return <AppBar token={token} />;
}
