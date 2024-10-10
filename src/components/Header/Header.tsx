/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { LogoFull } from '../../assets/Logo';
import MobileHeader from './MobileHeader';
import toast from 'react-hot-toast';
import VideoDialog from '../../app/(landing)/components/VideoDialog';
import DarkLogo from '@/assets/DarkLogo';

const Header = () => {
  return (
    <header className='relative w-full'>
      <div className='flex w-full flex-1 shrink-0 justify-center p-4 lg:px-6 lg:py-6 xl:px-10 main:px-16 main:py-8 2xl:py-10'>
        <div className='flex w-full max-w-[1720px] items-center justify-between gap-6'>
          <Link href='/'>
            <div className='block dark:hidden'>
              <LogoFull className='w-36 xl:w-40 main:w-52' />
            </div>
            <div className='hidden dark:block'>
              <DarkLogo />
            </div>
          </Link>
          <div className='hidden items-center gap-6 lg:flex xl:gap-8 main:gap-10'>
            {/* <Link
              href='https://youtu.be/Z9kuSLnsK24'
              rel='noopener noreferrer'
              target='_blank'
              className='font-semibold uppercase italic tracking-tight hover:underline xl:text-lg main:text-xl'
            >
              Our story
            </Link> */}
            <Link
              href='#whatweofer'
              rel='noopener noreferrer'
              className='capitalized font-semibold  tracking-tight hover:underline xl:text-lg main:text-xl'
            >
              What we offer
            </Link>
            <VideoDialog />
            <Link
              href='https://seeddao.gitbook.io/seed-tutorial'
              rel='noopener noreferrer'
              target='_blank'
              className='capitalized font-semibold  tracking-tight hover:underline xl:text-lg main:text-xl'
            >
              Tutorial
            </Link>

            {/* <button
              onClick={() => toast('🌱 Coming Soon! 🌱', { id: 'how_to_play' })}
              className='font-semibold uppercase  tracking-tight hover:underline xl:text-lg main:text-xl'
            >
              Tutorial
            </button> */}
            {/* <button
              onClick={() => toast('🌱 Coming Soon! 🌱', { id: 'green_paper' })}
              className='font-semibold uppercase  tracking-tight hover:underline xl:text-lg main:text-xl'
            >
              Green paper
            </button> */}
            {/* <button
              onClick={() => toast('🌱 Coming Soon! 🌱', { id: 'seed_combinator_program' })}
              className='font-semibold capitalize  tracking-tight hover:underline xl:text-lg main:text-xl'
            >
              Green paper
            </button> */}
            <Link
              href='#flagship'
              className='group flex items-center gap-2 font-semibold capitalize  tracking-tight hover:underline xl:text-lg main:text-xl'
            >
              Flagship
            </Link>
            <Link
              href='/memes'
              className='group flex items-center gap-2 font-semibold capitalize  tracking-tight hover:underline xl:text-lg main:text-xl'
            >
              Rewards
            </Link>
            <Link href='https://t.me/seed_coin_bot/app' rel='noopener noreferrer' target='_blank'>
              <div className='group rounded-lg bg-[#237E00]'>
                <button className='-translate-y-1 rounded-lg bg-gradient-to-r from-[#9EDA40] to-[#62AE39] px-4 py-2 font-tomorrow font-bold capitalize text-white group-hover:translate-y-0 xl:px-6 xl:py-3 xl:text-lg main:px-9 main:py-4 main:text-xl'>
                  Play SEED
                </button>
              </div>
            </Link>
          </div>
          <MobileHeader />
        </div>
      </div>
    </header>
  );
};

export default Header;
