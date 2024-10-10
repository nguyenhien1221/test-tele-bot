/* eslint-disable @next/next/no-img-element */
'use client';

import { Copy, Heart, Repeat } from 'lucide-react';
import { IMemeData } from './MemesData';
import { useState } from 'react';
import Dialog from '@/components/dialog';
import Link from 'next/link';
import { IconX } from '@/components/Footer/Footer';
import { CloseIcon } from '@/app/(landing)/components/VideoDialog';
import { copyImageToClipboard } from 'copy-image-clipboard';
import toast from 'react-hot-toast';

const MemesMuseum = ({ data }: { data: IMemeData[] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dialogData, setDialogData] = useState<IMemeData>();

  const handleOpenMeme = (item: IMemeData) => {
    setDialogData(item);
    setIsOpen(true);
  };

  const handleCopyImageToClipboard = (src: string) => {
    copyImageToClipboard(src)
      .then(() => {
        toast.success('Meme copied to clipboard!');
      })
      .catch((e) => {
        toast.error('Failed to copy');
      });
  };

  return (
    <>
      <section className='mx-auto w-full flex-1 px-4 sm:px-8 lg:px-12 main:max-w-[1354px]'>
        <h1 className='pt-4 text-center font-tomorrow text-3xl font-bold uppercase xs:text-4xl lg:hidden xl:text-5xl 2xl:text-6xl'>
          Seed memes
        </h1>
        <div className='grid grid-cols-2 gap-2 py-10 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5'>
          {data.map((item, index) => {
            return (
              <div
                key={`${item}-${index}`}
                className='relative aspect-square cursor-pointer'
                onClick={() => handleOpenMeme(item)}
              >
                <div className='relative h-full w-full transition-transform lg:hover:z-10 lg:hover:scale-125'>
                  {item.video ? (
                    <video autoPlay loop muted className='h-full w-full object-cover object-center'>
                      <source src={`/memes/${item.id}.mp4`} />
                    </video>
                  ) : (
                    <img className='h-full w-full object-cover object-center' src={`/memes/${item.id}.jpg`} alt='' />
                  )}
                  <div className='absolute right-1.5 top-1.5 flex items-center gap-1.5 rounded-full bg-black/70 px-1.5 py-0.5 lg:px-2 lg:py-1'>
                    <div className='flex items-center gap-1'>
                      <Heart className='w-3 lg:w-4' />
                      <span className='text-sm'>{item.like}</span>
                    </div>
                    <div className='h-4 border-[1px] border-r border-white/80'></div>
                    <div className='flex items-center gap-1'>
                      <Repeat className='w-3 lg:w-4' />
                      <span className='text-sm'>{item.retweet}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Dialog isOpen={isOpen} toggleDialog={() => setIsOpen(!isOpen)} className='pt-11 lg:pt-6'>
        {dialogData && (
          <>
            <div className='flex flex-col items-center gap-4'>
              {dialogData.video ? (
                <video autoPlay loop muted controls className='h-full'>
                  <source src={`/memes/${dialogData.id}.mp4`} />
                </video>
              ) : (
                <img className='h-full' src={`/memes/${dialogData.id}.jpg`} alt='' />
              )}
              <div className='flex items-center justify-center gap-4'>
                <Link
                  href={dialogData.url}
                  rel='noopener noreferrer'
                  target='_blank'
                  className='flex items-center justify-center gap-2 rounded-full border-2 border-white px-4 py-1 hover:bg-white/10'
                >
                  <IconX className='w-[14px]' />
                  <span className='tracking-tight text-[#CACACA]'>Go to post</span>
                </Link>
                {!dialogData.video && (
                  <button onClick={() => handleCopyImageToClipboard(`/memes/${dialogData.id}.jpg`)}>
                    <Copy />
                  </button>
                )}
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} className='absolute right-3 top-3 block lg:hidden'>
              <CloseIcon />
            </button>
          </>
        )}
      </Dialog>
    </>
  );
};

export default MemesMuseum;
