/* eslint-disable @next/next/no-img-element */
import Footer from '@/components/Footer/Footer';
import '@/app/starfield.scss';
import Header from '@/components/Header/Header';
import Link from 'next/link';

const MemesPage = async () => {
  const medals = [
    { type: 'Silver Creator Award', img: '/media/silver.png', sub: '100K Subscribers' },
    { type: 'Gold Creator Award', img: '/media/gold.png', sub: '1 Million Subscribers' },
    { type: 'Diamond Creator Award', img: '/media/diamond.png', sub: '10 Million Subscribers' },
  ];
  return (
    <main className='relative flex min-h-screen max-w-[100vw] flex-col overflow-hidden bg-[#fff] dark:bg-black'>
      {/* <div className='starfield'>
        <div className='stars'></div>
      </div> */}
      <div className='relative z-10 flex min-h-screen flex-col'>
        <Header />

        <section className='flex w-full flex-1 flex-col items-center justify-start gap-8 py-4'>
          <div className='max-w-[927px] '>
            <div className='mb-[73px] flex items-center justify-start gap-4 xs:px-4 xs:text-base lg:px-0 lg:text-[20px]'>
              <p className='text-[#797979]'>Home</p>
              <svg width='8' height='15' viewBox='0 0 8 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M1.97656 0.9375L7.5625 6.875C7.71875 7.07031 7.83594 7.30469 7.83594 7.5C7.83594 7.73438 7.71875 7.96875 7.5625 8.16406L1.97656 14.1016C1.625 14.4922 1.03906 14.4922 0.648438 14.1406C0.257812 13.7891 0.257812 13.2031 0.609375 12.8125L5.60938 7.5L0.609375 2.22656C0.257812 1.83594 0.257812 1.25 0.648438 0.898438C1.03906 0.546875 1.625 0.546875 1.97656 0.9375Z'
                  fill='#25311D'
                />
              </svg>
              <p className=' text-[#25311D] dark:text-[#E7F5D3]'>Reward</p>
            </div>

            <div className='text-[#25311D] xs:px-4 lg:px-0'>
              <p className='mb-6 font-bold xs:text-[48px] lg:text-[76px]'>Celebrate Your Growing Network!</p>
              <p className='mb-[30px] xs:text-base lg:text-[20px]'>
                SEED Combinator creator have poured their dedication into expanding their friend networks, and we’re
                honored to recognize them as they reach Connection Award milestones.
              </p>
              <p className='xs:text-base lg:text-[20px]'>
                Discover more about Connection Awards below, or log in to claim your award.{' '}
              </p>
              <div className='mt-[60px] flex items-center gap-5'>
                <Link href='/reward' rel='noopener noreferrer'>
                  <button className='rounded-lg bg-[#6EB73B] px-6 py-4 text-base font-semibold uppercase text-[#fff] xs:text-[12px] lg:text-base'>
                    Get my award
                  </button>
                </Link>
                <button className='flex items-center justify-center gap-3 text-base font-semibold text-[#6EB73B] xs:text-[12px] lg:text-base'>
                  Creator Awards FAQ{' '}
                  <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M17.75 1.5625V14.6875C17.75 15.4531 17.1484 16 16.4375 16C15.6719 16 15.125 15.4531 15.125 14.6875V4.73438L2.49219 17.3672C2.21875 17.6406 1.89062 17.75 1.5625 17.75C1.17969 17.75 0.851562 17.6406 0.632812 17.3672C0.0859375 16.875 0.0859375 16.0547 0.632812 15.5625L13.2656 2.875H3.3125C2.54688 2.875 2 2.32812 2 1.5625C2 0.851562 2.54688 0.25 3.3125 0.25H16.4375C17.1484 0.25 17.75 0.851562 17.75 1.5625Z'
                      fill='#6EB73B'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className='mt-[108px] flex w-full max-w-[1720px] items-center justify-center rounded-3xl bg-[#E6FBCA] xs:w-[95%] xs:px-4 xs:py-[50px] lg:mx-0 lg:py-[193px]'>
            <div className='flex w-full max-w-[927px] items-center gap-[105px] xs:flex-col xs:gap-8 lg:flex-row lg:gap-[105px]'>
              <img src='/media/reward.png' alt=''></img>
              <div className='text-[#25311D]'>
                <p className='mb-6 text-[20px] uppercase'>Featured</p>
                <p className='mb-6 text-[48px] font-bold'>Let&apos;s celebrate your hard work</p>
                <p className='mb-10 text-base'>
                  Get excited for the new ways creators can make money with YouTube Shorts.
                </p>
                <button className='flex items-center justify-center gap-3 text-base font-semibold text-[#6EB73B]'>
                  Creator Awards FAQ{' '}
                  <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M17.75 1.5625V14.6875C17.75 15.4531 17.1484 16 16.4375 16C15.6719 16 15.125 15.4531 15.125 14.6875V4.73438L2.49219 17.3672C2.21875 17.6406 1.89062 17.75 1.5625 17.75C1.17969 17.75 0.851562 17.6406 0.632812 17.3672C0.0859375 16.875 0.0859375 16.0547 0.632812 15.5625L13.2656 2.875H3.3125C2.54688 2.875 2 2.32812 2 1.5625C2 0.851562 2.54688 0.25 3.3125 0.25H16.4375C17.1484 0.25 17.75 0.851562 17.75 1.5625Z'
                      fill='#6EB73B'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className='mb-[100px] mt-7 flex w-full max-w-[1720px] items-center justify-between gap-[60px] xs:w-[95%] xs:flex-col lg:flex-row'>
            {medals.map((item, index: number) => (
              <div key={index} className='text-base text-[#25311D]'>
                <img src={item.img} alt=''></img>
                <p className='mb-4 mt-[34px] '>{item.sub}</p>
                <p className='text-[24px] text-[#000000]'>{item.type}</p>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default MemesPage;
