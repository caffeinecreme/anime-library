'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [navbarBg, setNavbarBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setNavbarBg(true);
      } else {
        setNavbarBg(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
        navbarBg
          ? 'bg-zinc-900/60 shadow-md backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className='flex items-center'>
        <Link href={'/'} className='text-2xl font-bold text-white'>
          <span className='text-purple-500'>Anime</span>Library
        </Link>
      </div>

      <div className='md:flex items-center space-x-8'>
        <Link
          href={'/my-list'}
          className='text-gray-400 hover:text-white transition-colors'
        >
          My List
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
