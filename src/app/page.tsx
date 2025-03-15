'use client';

import Card from '@/components/Card';
import SearchBar from '@/components/SearchBar';
import { useInfiniteQuery } from '@tanstack/react-query';
import { API_URL } from './constants';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { slugify } from '@/utils/slugify';
import { useDebounce } from '@/hooks/useDebounce';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(urlQuery);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const limit = 24;

  useEffect(() => {
    if (debouncedSearch) {
      router.push(`?q=${encodeURIComponent(debouncedSearch)}`, {
        scroll: false,
      });
    } else if (urlQuery && debouncedSearch !== urlQuery) {
      router.push('', { scroll: false });
    }
  }, [debouncedSearch, router, urlQuery]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['anime-list', limit, debouncedSearch],
      queryFn: async ({ pageParam = 1 }) => {
        const url = debouncedSearch
          ? `${API_URL}anime?page=${pageParam}&limit=${limit}&q=${debouncedSearch}`
          : `${API_URL}anime?page=${pageParam}&limit=${limit}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      },
      getNextPageParam: (lastPage) => {
        return lastPage.pagination.has_next_page
          ? lastPage.pagination.current_page + 1
          : undefined;
      },
      initialPageParam: 1,
    });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    if (loadMoreRef.current) {
      observerRef.current = new IntersectionObserver(handleObserver, {
        rootMargin: '0px 0px 200px 0px',
      });

      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  const allAnimeData = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className='pt-24 px-6 min-h-screen bg-gradient-to-b from-purple-900/20 to-black'>
      <div className='h-96 flex flex-col justify-center items-center'>
        <h1 className='text-5xl md:text-6xl font-bold mb-6 text-center'>
          <span className='text-purple-400'>Browse Anime</span> <br />
          save your next anime to watch
        </h1>
        <SearchBar onSearch={handleSearch} initialValue={urlQuery} />
      </div>

      <div className='grid grid-cols-6 gap-5 my-4'>
        {allAnimeData.map((anime: any) => (
          <div key={anime.mal_id}>
            <Link href={`/anime/${anime.mal_id}/${slugify(anime.title)}`}>
              <Card
                title={anime.title}
                imgSource={anime.images.webp.image_url}
                type={anime.type}
              />
            </Link>
          </div>
        ))}
      </div>

      {isFetchingNextPage && (
        <div className='flex justify-center my-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500'></div>
        </div>
      )}

      {hasNextPage && <div ref={loadMoreRef} className='h-10 w-full' />}

      {!hasNextPage && !isLoading && allAnimeData.length > 0 && (
        <div className='text-center text-gray-400 my-8'>
          No more anime to load
        </div>
      )}

      {!isLoading && allAnimeData.length === 0 && (
        <div className='text-center text-gray-400 my-8'>No anime found</div>
      )}
    </div>
  );
}
