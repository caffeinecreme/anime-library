'use client';

import React, { ChangeEvent, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  initialValue: string;
}

const SearchBar = ({ onSearch, initialValue = '' }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <div className='relative w-full max-w-md'>
      <div className='group flex items-center bg-zinc-900 rounded-full border border-zinc-700 transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-sm focus-within:shadow-purple-500/20'>
        <div className='p-3 text-gray-400 group-focus-within:text-purple-500'>
          <Search size={20} />
        </div>

        <input
          ref={inputRef}
          value={searchTerm}
          onChange={handleInputChange}
          type='text'
          placeholder='Search anime, movies...'
          className='bg-transparent text-white w-full py-3 px-1 focus:outline-none focus:ring-0'
        />

        {searchTerm && (
          <button
            onClick={clearSearch}
            className='p-3 text-gray-400 hover:text-white cursor-pointer'
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
