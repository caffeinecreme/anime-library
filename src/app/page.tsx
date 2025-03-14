import Card from '@/components/Card';
import SearchBar from '@/components/SearchBar';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='pt-24 px-6 min-h-screen bg-gradient-to-b from-purple-900/20 to-black'>
      <div className='h-96 flex flex-col justify-center items-center'>
        <h1 className='text-5xl md:text-6xl font-bold mb-6 text-center'>
          <span className='text-purple-400'>Browse Anime</span> <br />
          save your next anime to watch
        </h1>
        <SearchBar />
      </div>

      <h4 className='text-lg font-bold mb-6'>
        <span className='text-purple-400'>Featured Today</span>
      </h4>
      <div className='grid grid-cols-6 gap-5 my-4'>
        {Array.from({ length: 12 }).map(() => (
          <Card />
        ))}
      </div>
    </div>
  );
}
