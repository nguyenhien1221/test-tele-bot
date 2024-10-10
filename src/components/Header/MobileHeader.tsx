/* eslint-disable @next/next/no-img-element */
'use client';

import { LogoFull } from '@/assets/Logo';
import { cn } from '@/lib/cn';
import { PropsWithClassName } from '@/types';
import clsx from 'clsx';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import VideoDialog from '../../app/(landing)/components/VideoDialog';
import DarkLogo from '@/assets/DarkLogo';

const IconMenu = ({ className }: PropsWithClassName) => (
  <svg width='22' height='18' viewBox='0 0 22 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M0.5 1.125C0.5 0.515625 0.96875 0 1.625 0H20.375C20.9844 0 21.5 0.515625 21.5 1.125C21.5 1.78125 20.9844 2.25 20.375 2.25H1.625C0.96875 2.25 0.5 1.78125 0.5 1.125ZM0.5 8.625C0.5 8.01562 0.96875 7.5 1.625 7.5H20.375C20.9844 7.5 21.5 8.01562 21.5 8.625C21.5 9.28125 20.9844 9.75 20.375 9.75H1.625C0.96875 9.75 0.5 9.28125 0.5 8.625ZM20.375 17.25H1.625C0.96875 17.25 0.5 16.7812 0.5 16.125C0.5 15.5156 0.96875 15 1.625 15H20.375C20.9844 15 21.5 15.5156 21.5 16.125C21.5 16.7812 20.9844 17.25 20.375 17.25Z'
      fill='black'
    />
  </svg>
);

const IconMenuDark = ({ className }: PropsWithClassName) => (
  <svg width='27' height='22' viewBox='0 0 27 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M25.3438 19.0814C26.1055 19.0814 26.75 19.7259 26.75 20.5462C26.75 21.308 26.1055 21.8939 25.3438 21.8939H1.84766C1.08594 21.8939 0.5 21.308 0.5 20.4876C0.5 19.7259 1.08594 19.0814 1.84766 19.0814H25.3438ZM25.3438 0.33139C26.1055 0.33139 26.75 1.09311 26.75 1.79623C26.75 2.55795 26.1055 3.14389 25.3438 3.14389H1.84766C1.08594 3.14389 0.5 2.44077 0.5 1.73764C0.5 0.975922 1.08594 0.33139 1.84766 0.33139H25.3438ZM25.3438 9.70639C26.1055 9.70639 26.75 10.3509 26.75 11.1126C26.75 11.933 26.1055 12.5189 25.3438 12.5189H1.84766C1.08594 12.5189 0.5 11.933 0.5 11.1126C0.5 10.3509 1.08594 9.70639 1.84766 9.70639H25.3438Z'
      fill='white'
    />
  </svg>
);

const IconClose = ({ className }: PropsWithClassName) => (
  <svg className={cn('w-6', className)} x='0px' y='0px' viewBox='0 0 50 50'>
    <path
      fill='white'
      d='M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z'
    ></path>
  </svg>
);
const IconCloseDark = ({ className }: PropsWithClassName) => (
  <svg className={cn('w-6', className)} x='0px' y='0px' viewBox='0 0 50 50'>
    <path
      fill='black'
      d='M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z'
    ></path>
  </svg>
);

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
      return;
    }
    document.body.style.overflowY = 'auto';
  }, [isOpen]);

  return (
    <>
      <div className='block lg:hidden'>
        <button onClick={() => setIsOpen(true)}>
          <IconMenu className='dark:hidden' />
          <IconMenuDark className='dark:block' />
        </button>
      </div>

      <div
        className={clsx(
          'fixed left-0 top-0 z-50 h-screen w-full bg-[#F2FFE0] transition-transform duration-500 lg:hidden dark:bg-black',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className='p-4'>
          <div className='flex items-center justify-between'>
            <div className='block dark:hidden'>
              <LogoFull className='w-36 xl:w-40 main:w-52' />
            </div>
            <div className='hidden dark:block'>
              <DarkLogo />
            </div>
            <button onClick={() => setIsOpen(false)}>
              <IconClose className='hidden dark:block' />
              <IconCloseDark className='block dark:block' />
            </button>
          </div>

          <div className='mt-8 flex flex-col items-center gap-4'>
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
          </div>
          <div className='mt-8 flex justify-center'>
            <Link href='https://t.me/seed_coin_bot/app' rel='noopener noreferrer' target='_blank'>
              <div className='group rounded-lg bg-[#237E00]'>
                <button className='-translate-y-1 rounded-lg bg-gradient-to-r from-[#73E448] to-[#38B00A] px-4 py-2 font-tomorrow font-bold capitalize text-white group-hover:translate-y-0'>
                  Play game
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
