'use client';

import Card from '@/components/Card';
import SearchBar from '@/components/SearchBar';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from './constants';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(urlQuery);
  const [debouncedSearch, setDebouncedSearch] = useState(urlQuery);

  const page = 1,
    limit = 24;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);

      if (searchTerm) {
        router.push(`?q=${encodeURIComponent(searchTerm)}`, {
          scroll: false,
        });
      } else if (urlQuery) {
        router.push('', { scroll: false });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, router, urlQuery]);

  const { data } = useQuery({
    queryKey: ['anime-list', page, limit, debouncedSearch],
    queryFn: async () => {
      const url = debouncedSearch
        ? `${API_URL}anime?page=${page}&limit=${limit}&q=${debouncedSearch}`
        : `${API_URL}anime?page=${page}&limit=${limit}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    },
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className='pt-24 px-6 min-h-screen bg-gradient-to-b from-purple-900/20 to-black'>
      <div className='h-96 flex flex-col justify-center items-center'>
        <h1 className='text-5xl md:text-6xl font-bold mb-6 text-center'>
          <span className='text-purple-400'>Browse Anime</span> <br />
          save your next anime to watch
        </h1>
        <SearchBar onSearch={handleSearch} initialValue={urlQuery} />
      </div>

      <h4 className='text-lg font-bold mb-6'>
        <span className='text-purple-400'>Featured Today</span>
      </h4>
      <div className='grid grid-cols-6 gap-5 my-4'>
        {data &&
          data.data.length > 0 &&
          data?.data.map((anime: any, index: any) => (
            <div key={anime.rank}>
              <Card
                title={anime?.title}
                imgSource={anime.images.webp.image_url}
                type={anime.type}
                genres={anime.genres}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
