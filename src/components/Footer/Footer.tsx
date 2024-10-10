/* eslint-disable @next/next/no-img-element */
'use client';
import { PropsWithClassName } from '@/types';
import clsx from 'clsx';
import Link from 'next/link';

export const IconX = ({ className }: PropsWithClassName) => (
  <img className='size-[20px]' src='/media/x.png' alt=''></img>
);

export const IconTele = () => <img className='size-[20px]' src='/media/telegram.png' alt=''></img>;

export const IconYt = () => <img className='h-[20px] w-[30px]' src='/media/youtube.png' alt=''></img>;

const handleScrollTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }
};

const Footer = () => {
  const renderIcon = (title: string) => {
    if (title === 'telegram') {
      return <IconTele></IconTele>;
    }
    if (title === 'twitter') {
      return <IconX></IconX>;
    }
    return <IconYt></IconYt>;
  };
  const socails = [
    { title: 'telegram', url: 'https://t.me/seedupdates', icon: '' },
    { title: 'twitter', url: 'https://x.com/SeedCombinator' },
    { title: 'youtube', url: 'https://www.youtube.com/@seedcombinator' },
  ];

  return (
    <footer className='relative border-t-[1px] border-[#222222] bg-[#090E04] dark:border-none dark:bg-[#010100B2]'>
      <div className='flex w-full items-center justify-center pt-[51px]'>
        <button
          onClick={() => handleScrollTop()}
          className='flex size-[69px] items-center justify-center rounded-[50%] bg-[#F2FFE0]'
        >
          <svg width='26' height='28' viewBox='0 0 26 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M1.375 11.5L11.875 0.5C12.1875 0.1875 12.5625 0.0625 13 0.0625C13.375 0.0625 13.75 0.1875 14.0625 0.5L24.5625 11.5C25.125 12.125 25.125 13.0625 24.5 13.625C23.9375 14.1875 22.9375 14.1875 22.375 13.5625L14.5 5.25V26.5C14.5 27.375 13.8125 28 13 28C12.25 28 11.5 27.375 11.5 26.5V5.25L3.5625 13.5625C3 14.1875 2 14.1875 1.4375 13.625C0.8125 13.0625 0.8125 12.0625 1.375 11.5Z'
              fill='#090E04'
            />
          </svg>
        </button>
      </div>
      <h1 className='text-center font-semibold text-[#8DE74E] xs:mt-[30px] xs:text-[35px] lg:mt-0 lg:text-[121px]'>
        SEED Combinator
      </h1>
      <div className='flex w-full justify-center'>
        <div className={clsx('grid gap-3 py-3 xs:grid-cols-2 xs:py-6 lg:max-w-[1200px] lg:grid-cols-3 main:py-10')}>
          {socails.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              rel='noopener noreferrer'
              target='_blank'
              className='flex h-9 w-36 items-center justify-center gap-2 rounded-xl border-[1px] border-[#8DE74E] hover:bg-white/10 xs:w-40 main:h-10'
            >
              <div className='max-w-[105px]'>{renderIcon(item.title)}</div>
              <span className='font-medium capitalize tracking-tight text-[#8DE74E] xl:text-lg main:text-2xl'>
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <p className='text-center text-[20px] text-[#718465] xs:my-6  lg:mt-[100px]'>
        Copyright © 2023 GameFi. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
