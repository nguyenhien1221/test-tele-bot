import Link from 'next/link';
import './starfield.scss';

const NotFoundPage = () => {
  return (
    <main className='relative flex min-h-screen max-w-[100vw] flex-col overflow-hidden bg-black'>
      <div className='starfield'>
        <div className='stars'></div>
      </div>
      <div className='relative z-10 flex min-h-screen flex-col items-center justify-center gap-6'>
        <p className='px-4 text-center font-tomorrow text-2xl uppercase sm:text-3xl'>
          We were unable to find this page
        </p>
        <Link href={'/'} className='hover:underline'>
          Back to home
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
