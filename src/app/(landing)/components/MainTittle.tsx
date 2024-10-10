/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import MovingBush from './MovingBush';
import clsx from 'clsx';
import Cloud from './Cloud';
import { useChangeMode } from '@/store/mode';
import Link from 'next/link';

const MainTittle = () => {
  const changeMode = useChangeMode((state: any) => state.changeMode);
  const mode = useChangeMode((state: any) => state.mode);

  const isDarkMode = mode === 'dark';

  useEffect(() => {
    if (mode === 'light') {
      document.documentElement.classList.remove('dark');
      changeMode('light');
      return;
    }
    document.documentElement.classList.add('dark');
    changeMode('dark');
  }, [changeMode, mode]);

  const handleChangeToDark = () => {
    document.documentElement.classList.add('dark');
    changeMode('dark');
  };

  const handleChangeToLight = () => {
    document.documentElement.classList.remove('dark');
    changeMode('light');
  };

  return (
    <div className='relative mb-[250px] mt-[80px] flex xs:justify-center lg:justify-start'>
      <div className='relative flex w-[90%] items-start justify-between p-4 pb-0 xs:flex-col xs:items-center sm:flex-col sm:items-center lg:flex-col lg:items-center lg:pl-6 lg:pt-6 xl:flex-row xl:items-start xl:pl-10 main:pl-16 main:pt-8 2xl:flex-row 2xl:pt-10'>
        {!isDarkMode ? (
          <div
            onClick={() => handleChangeToDark()}
            className={clsx(
              'absolute flex cursor-pointer items-center justify-center rounded-[50%]',
              'xs:-right-[20px] xs:top-[45%] lg:-right-[90px] xl:-top-[55px]'
            )}
          >
            <img className='absolute z-40 xs:max-w-[74px] lg:max-w-[160px] ' src='/media/sun.png' alt='tree' />
            <div className={clsx('bg-[#FDFF8F] blur-3xl xs:size-[98px] lg:size-[230px] ')}></div>
          </div>
        ) : (
          <div
            onClick={() => handleChangeToLight()}
            className={clsx(
              'absolute flex cursor-pointer items-center justify-center rounded-[50%]',
              'xs:-right-[20px] xs:top-[45%] lg:-right-[90px] xl:-top-[55px]'
            )}
          >
            <img className='absolute z-40 xs:max-w-[74px] lg:max-w-[160px] ' src='/media/moon.png' alt='tree' />
            <div className={clsx('bg-[#D2FDBB33] blur-3xl xs:size-[98px] lg:size-[230px] ')}></div>
          </div>
        )}

        <div className='absolute xs:left-0 xs:top-[45%] lg:-top-10 lg:left-[50%] lg:-translate-x-[50%]'>
          <Cloud />
        </div>
        <div className=' absolute z-20 xs:bottom-[30%] xs:right-0 lg:-right-[7%] lg:bottom-[50%] lg:-translate-x-[50%]'>
          <Cloud />
        </div>
        <div className='xs:mb-[60px] xs:flex xs:flex-col xs:items-center lg:flex lg:flex-col lg:items-center xl:mb-0 xl:block'>
          <h1 className='font-semibold text-[#25311D] xs:text-[32px] lg:text-[80px] dark:text-white'>Why</h1>
          <h1 className='font-semibold text-[#6EB73B] xs:text-[32px] lg:text-[80px] dark:text-[#8DE74E]'>
            SEED Combinator
          </h1>
          <p className='mt-6 font-normal xs:text-center xs:text-sm xs:leading-[48px] lg:text-start lg:text-[32px]'>
            A thousand-mile journey starts with a single SEED
          </p>
          <Link
            href='https://airtable.com/app1mJqw5ccyh9gjv/pagUwI455riQZC3rh/form'
            target='_blank'
            rel='noopener noreferrer'
          >
            <button className='relative z-40 mt-[60px] rounded-[8px] bg-gradient-to-r from-[#9EDA40] to-[#62AE39] px-[38px] py-4 text-[20px] font-bold text-white shadow-[0_5px_0_#237E00]'>
              Apply to SC
            </button>
          </Link>
          <button className='absolute left-[50%] z-40 flex size-[69px] -translate-x-[50%] cursor-pointer items-center justify-center rounded-[50%] bg-[#E3F3CD] xs:hidden xl:flex'>
            <svg width='26' height='28' viewBox='0 0 26 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M24.625 16.5L14.125 27.5C13.8125 27.8125 13.4375 27.9375 13 27.9375C12.625 27.9375 12.25 27.8125 11.9375 27.5L1.4375 16.5C0.875001 15.875 0.875001 14.9375 1.5 14.375C2.0625 13.8125 3.0625 13.8125 3.625 14.4375L11.5 22.75L11.5 1.5C11.5 0.624999 12.1875 -1.1201e-06 13 -1.04907e-06C13.75 -9.83506e-07 14.5 0.624999 14.5 1.5L14.5 22.75L22.4375 14.4375C23 13.8125 24 13.8125 24.5625 14.375C25.1875 14.9375 25.1875 15.9375 24.625 16.5Z'
                fill='#090E04'
              />
            </svg>
          </button>
        </div>
        <div className='relative'>
          <img className='xs:max-w-[306px] lg:max-w-[650px]' src='/media/tree.png' alt='tree' />
          <img
            className='absolute left-[50%] top-0 -translate-x-[50%] xs:max-w-[138px] lg:max-w-[274px]'
            src='/media/owl.gif'
            alt='owl'
          />
          <div>
            <img
              className='absolute left-[56%] top-[68%] xs:max-w-[31px] lg:max-w-[274px] dark:left-[55%] '
              src={isDarkMode ? '/media/sleeping_worm_2.png' : '/media/awake_worm_2.png'}
              alt='worm2'
            />
            <img
              className='absolute left-[50%] top-[81%] xs:max-w-[55px] lg:max-w-[274px] '
              src={isDarkMode ? '/media/sleeping_worm.png' : '/media/awake_worm.png'}
              alt='worm1'
            />
            <div className='absolute left-[27%] top-[78%] '>
              <img
                className='xs:max-w-[38px] lg:max-w-[274px]'
                src={isDarkMode ? '/media/sleeping_worm_3.png' : '/media/awake_worm_3.png'}
                alt='worm3'
              />

              <div className='worm_dialog absolute block py-2 text-center font-semibold xs:-left-[28px] xs:-top-[40px] xs:px-2 xs:text-[13px] lg:-left-[20%] lg:-top-10 lg:px-3 lg:text-[24px] dark:hidden'>
                Hello World
              </div>
            </div>
          </div>
        </div>
      </div>

      <MovingBush />
    </div>
  );
};

export default MainTittle;
