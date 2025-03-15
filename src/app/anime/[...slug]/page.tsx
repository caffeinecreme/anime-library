'use client';

import Image from 'next/image';
import imgPlaceholder from '@/app/img-placeholder.svg';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/app/constants';
import { useParams } from 'next/navigation';

interface Genre {
  mal_id: number;
  name: string;
  type: string;
  url: string;
}

const AnimeDetail = () => {
  const params = useParams();
  const slugArray = Array.isArray(params.slug)
    ? params.slug
    : params.slug?.split('/') || [];

  const id = slugArray[0];

  const { data, isLoading } = useQuery({
    queryKey: ['anime-detail', id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}anime/${id}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    },
  });

  const anime = data?.data;

  return (
    <>
      {!isLoading && (
        <div className='pt-36 px-6 min-h-screen bg-gradient-to-b from-purple-900/20 to-black'>
          <div className='h-96 grid sm:grid-cols-1 lg:grid-cols-2 '>
            <div className='flex justify-center items-baseline'>
              <Image
                src={anime?.images.webp.large_image_url || imgPlaceholder}
                alt='image placeholder'
                width={400}
                height={100}
              />
            </div>
            <div>
              <h1 className='text-3xl font-bold mb-1.5'>
                {anime?.title} {anime?.year && `- ${anime.year}`}
              </h1>
              <p className='font-bold'>
                {anime?.type} - {anime?.episodes} episodes
              </p>
              <div className='mt-3.5'>
                {anime?.genres.map((genre: Genre) => (
                  <span
                    key={genre.mal_id}
                    className='bg-purple-900 text-white text-xs px-2 py-1 rounded-full'
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <div className='flex items-center gap-2 mt-3.5'>
                <p className='bg-amber-400 text-black p-1 rounded-md '>Score</p>
                <p className='text-2xl font-bold'>{anime?.score}</p>
              </div>
              <div className='flex items-center gap-5 flex-row mt-3.5'>
                <div className='flex gap-1.5'>
                  <p>Rank</p>
                  <p>#{anime?.rank}</p>
                </div>
                <div className='flex gap-1.5'>
                  <p>Popularity</p>
                  <p>#{anime?.popularity}</p>
                </div>
              </div>

              <h4 className='mt-3.5 text-xl font-bold'>Synopsis</h4>
              <p>{anime?.synopsis}</p>

              <h4 className='mt-3.5 text-xl font-bold'>Background</h4>
              <p>{anime?.background || '-'}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnimeDetail;
