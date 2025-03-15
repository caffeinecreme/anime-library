'use client';

import Image from 'next/image';
import imgPlaceholder from '../../app/img-placeholder.svg';
import { FC } from 'react';

interface CardProps {
  title: string;
  imgSource: string;
  type: string;
}

const Card: FC<CardProps> = ({ title, imgSource, type }) => {
  return (
    <div className='flex justify-center items-center flex-col'>
      <div className='relative  overflow-hidden rounded-md mb-0.5 lg:mb-1.5 h-50 lg:h-72'>
        <Image
          src={imgSource || imgPlaceholder}
          alt='Image Placeholder'
          height={400}
          width={400}
        />
        <div className='absolute top-2 left-2 bg-gray-900 rounded-md p-2 text-xs'>
          {type}
        </div>
      </div>
      <h4 className='font-bold text-md text-center'>{title}</h4>
    </div>
  );
};

export default Card;
