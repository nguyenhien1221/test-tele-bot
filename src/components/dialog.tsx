'use client';

import { cn } from '@/lib/cn';
import { ReactNode, useEffect, useRef } from 'react';

interface DialogProps {
  isOpen: boolean;
  toggleDialog: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
  hideOnClickOutside?: boolean;
}

const CloseIcon = () => (
  <svg width='32' height='32' viewBox='0 0 28 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M14 28.5C6.23438 28.5 0 22.2656 0 14.5C0 6.78906 6.23438 0.5 14 0.5C21.7109 0.5 28 6.78906 28 14.5C28 22.2656 21.7109 28.5 14 28.5ZM9.57031 10.0703C9.02344 10.6172 9.02344 11.4375 9.57031 11.9297L12.1406 14.5L9.57031 17.0703C9.02344 17.6172 9.02344 18.4375 9.57031 18.9297C10.0625 19.4766 10.8828 19.4766 11.375 18.9297L13.9453 16.3594L16.5156 18.9297C17.0625 19.4766 17.8828 19.4766 18.375 18.9297C18.9219 18.4375 18.9219 17.6172 18.375 17.0703L15.8047 14.5L18.375 11.9297C18.9219 11.4375 18.9219 10.6172 18.375 10.0703C17.8828 9.57812 17.0625 9.57812 16.5156 10.0703L13.9453 12.6406L11.375 10.0703C10.8828 9.57812 10.0625 9.57812 9.57031 10.0703Z'
      fill='white'
    />
  </svg>
);

const Dialog = ({ isOpen, toggleDialog, children, title, className, hideOnClickOutside = true }: DialogProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hideOnClickOutside) return;

    const handleClick = (event: MouseEvent) => {
      if (wrapperRef?.current && !wrapperRef?.current?.contains(event?.target as Node)) {
        toggleDialog();
      }
    };

    if (!isOpen) {
      document.removeEventListener('click', handleClick, { capture: true });
      return;
    }

    document.addEventListener('click', handleClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [wrapperRef, hideOnClickOutside, isOpen, toggleDialog]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
      return;
    }
    document.body.style.overflowY = 'auto';
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[999] overflow-y-auto'>
      <div className='flex min-h-screen items-center justify-center py-4 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 -z-[1] bg-black bg-opacity-90 transition-opacity'></div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className='hidden sm:inline-block sm:h-screen sm:align-middle'>&#8203;</span>

        <div
          ref={wrapperRef}
          className={cn(
            'relative inline-block w-full transform rounded-[20px] border-2 border-solid border-white bg-black p-6 text-center align-bottom transition-all sm:max-w-xl sm:align-middle',
            className
          )}
        >
          {title && (
            <div className='border-b-1 mb-5 flex justify-between border-solid border-black/80 pb-6'>
              <p className='text-2xl font-bold'>{title}</p>
              <div onClick={toggleDialog} className='cursor-pointer'>
                <CloseIcon />
              </div>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
