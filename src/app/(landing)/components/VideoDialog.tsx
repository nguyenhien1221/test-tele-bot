'use client';

import Dialog from '@/components/dialog';
import { useState } from 'react';

export const CloseIcon = () => (
  <svg width='28' height='28' viewBox='0 0 28 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M14 28.5C6.23438 28.5 0 22.2656 0 14.5C0 6.78906 6.23438 0.5 14 0.5C21.7109 0.5 28 6.78906 28 14.5C28 22.2656 21.7109 28.5 14 28.5ZM9.57031 10.0703C9.02344 10.6172 9.02344 11.4375 9.57031 11.9297L12.1406 14.5L9.57031 17.0703C9.02344 17.6172 9.02344 18.4375 9.57031 18.9297C10.0625 19.4766 10.8828 19.4766 11.375 18.9297L13.9453 16.3594L16.5156 18.9297C17.0625 19.4766 17.8828 19.4766 18.375 18.9297C18.9219 18.4375 18.9219 17.6172 18.375 17.0703L15.8047 14.5L18.375 11.9297C18.9219 11.4375 18.9219 10.6172 18.375 10.0703C17.8828 9.57812 17.0625 9.57812 16.5156 10.0703L13.9453 12.6406L11.375 10.0703C10.8828 9.57812 10.0625 9.57812 9.57031 10.0703Z'
      fill='white'
    />
  </svg>
);

const VideoDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='capitalized font-semibold tracking-tight hover:underline xl:text-lg main:text-xl'
      >
        Our story
      </button>

      <Dialog
        isOpen={isOpen}
        toggleDialog={() => setIsOpen(!isOpen)}
        className='w-full px-2 py-12 sm:max-w-none sm:px-6 md:max-w-[90vw] lg:max-w-[80vw] lg:py-6 2xl:max-w-7xl'
      >
        <div>
          <iframe
            className='aspect-video w-full'
            src='https://www.youtube.com/embed/Z9kuSLnsK24?si=nKu8fJ4cRm-WRQ-t'
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
        </div>
        <button onClick={() => setIsOpen(false)} className='absolute right-4 top-4 block lg:hidden'>
          <CloseIcon />
        </button>
      </Dialog>
    </>
  );
};

export default VideoDialog;
