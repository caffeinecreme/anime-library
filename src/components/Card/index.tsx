'use client';

import Image from 'next/image';
import imgPlaceholder from '../../app/img-placeholder.svg';

const Card = () => {
  return (
    <div className='flex justify-center items-center flex-col'>
      <div className='relative'>
        <Image
          src={imgPlaceholder}
          alt='Image Placeholder'
          className='rounded-md mb-1.5'
          height={400}
        />
        <div className='absolute top-2 left-2 bg-gray-900 rounded-md p-2 text-xs'>
          TV
        </div>
      </div>
      <h4 className='font-bold text-md text-center'>Anime Title</h4>
    </div>
  );
};

export default Card;
