'use client';

import { LogoFull } from '@/assets/Logo';
import Link from 'next/link';

const MemesHeader = () => {
  return (
    <header className='relative w-full'>
      <div className='w-full p-4 lg:px-8 lg:py-6 xl:px-10 main:px-16 main:py-8 2xl:py-10'>
        <div className='grid max-w-[1720px] grid-cols-2 items-center justify-between lg:grid-cols-3'>
          <Link href='/'>
            <LogoFull className='w-32 xs:w-36 xl:w-40 main:w-52' />
          </Link>
          <h1 className='hidden select-none text-center font-tomorrow text-3xl font-bold uppercase xs:text-4xl lg:block xl:text-5xl 2xl:text-6xl'>
            Seed memes
          </h1>
          <Link
            href='https://forms.gle/Q9svLgTf2PZv33hE8'
            rel='noopener noreferrer'
            target='_blank'
            className='ml-auto'
          >
            <div className='group rounded-lg bg-orange-600'>
              <button className='-translate-y-1 rounded-lg bg-orange-400 px-2 py-1 font-tomorrow text-sm font-bold uppercase group-hover:translate-y-0 xs:px-4 xs:py-2 xs:text-base xl:px-6 xl:py-3 xl:text-lg main:px-9 main:py-4 main:text-xl'>
                Submit memes
              </button>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MemesHeader;
