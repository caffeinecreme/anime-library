import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className='relative w-full max-w-md'>
      <div className='group flex items-center bg-zinc-900 rounded-full border border-zinc-700 transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-sm focus-within:shadow-purple-500/20'>
        <div className='p-3 text-gray-400 group-focus-within:text-purple-500'>
          <Search size={20} />
        </div>

        <input
          type='text'
          placeholder='Search anime, movies...'
          className='bg-transparent text-white w-full py-3 px-1 focus:outline-none focus:ring-0'
        />

        <div className='p-3 text-gray-400 hover:text-white cursor-pointer'>
          <X size={18} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
