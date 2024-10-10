/* eslint-disable @next/next/no-img-element */
'use client';
import Footer from '@/components/Footer/Footer';
import '@/app/starfield.scss';
import Header from '@/components/Header/Header';
import clsx from 'clsx';

const RewardPage = () => {
  const handleLogginTele = () => {
    (window as any).Telegram.Login.auth(
      { bot_id: process.env.NEXT_PUBLIC_BOT_ID, request_access: 'true' },
      (data: any) => {
        if (!data) {
          console.log('ERROR: something went wrong');
        }

        // Validate data here
        console.log(data);
      }
    );
  };
  return (
    <main className='relative flex min-h-screen max-w-[100vw] flex-col overflow-hidden bg-[#fff] dark:bg-black'>
      <div className='relative z-10 flex min-h-screen flex-col'>
        <Header />
        <section className='flex w-full flex-1 flex-col items-center justify-start gap-8 py-4'>
          <div className='my-[100px] flex w-full max-w-[1720px] items-center justify-center rounded-3xl xs:w-[95%] xs:px-4 lg:mx-0'>
            <div
              className={clsx(
                'flex w-full max-w-[950px] items-start xs:flex-col',
                'rounded-2xl border-[1px] border-[#DCDCDC] xs:p-5 lg:p-10'
              )}
            >
              <div className='mb-2 flex items-center gap-3'>
                <img src='/media/seed.png' alt=''></img>
                <p className='text-[28px] font-medium'>Get a SEED Combinator Creator Award</p>
              </div>
              <div className='ml-[48px]'>
                <p className='text-base'>Check your eligibility for a SEED Combinator Creator Award</p>
                <div className='mt-[50px]'>
                  <p className='text-base font-semibold'>Ready to get started?</p>
                  <div className='mt-4'>
                    <button
                      onClick={() => handleLogginTele()}
                      className='flex items-center gap-[10px] rounded-[50px] bg-gradient-to-r from-[#29AAEC] to-[#239FDB] p-[5px] pr-[17px] text-white'
                    >
                      <div className='flex size-10 items-center justify-center rounded-[50%] bg-[#fff]'>
                        <svg width='23' height='20' viewBox='0 0 23 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M0.450638 9.47833C2.78862 8.1905 5.39846 7.11567 7.83696 6.03533C12.0321 4.26583 16.244 2.527 20.4983 0.908166C21.326 0.632333 22.8133 0.362583 22.9591 1.58925C22.8793 3.32558 22.5508 5.05175 22.3255 6.77792C21.7535 10.5739 21.0925 14.3569 20.448 18.1404C20.2259 19.4007 18.6471 20.0531 17.637 19.2466C15.2093 17.6067 12.763 15.9829 10.3663 14.3051C9.58121 13.5073 10.3092 12.3617 11.0104 11.7921C13.0099 9.82158 15.1304 8.14742 17.0254 6.07508C17.5365 4.84067 16.0262 5.881 15.528 6.19975C12.7907 8.08608 10.1204 10.0876 7.23437 11.7454C5.76021 12.5569 4.04204 11.8634 2.56854 11.4106C1.24735 10.8636 -0.688662 10.3125 0.450505 9.47842L0.450638 9.47833Z'
                            fill='white'
                          />
                          <path
                            d='M0.450638 9.47833C2.78862 8.1905 5.39846 7.11567 7.83696 6.03533C12.0321 4.26583 16.244 2.527 20.4983 0.908166C21.326 0.632333 22.8133 0.362583 22.9591 1.58925C22.8793 3.32558 22.5508 5.05175 22.3255 6.77792C21.7535 10.5739 21.0925 14.3569 20.448 18.1404C20.2259 19.4007 18.6471 20.0531 17.637 19.2466C15.2093 17.6067 12.763 15.9829 10.3663 14.3051C9.58121 13.5073 10.3092 12.3617 11.0104 11.7921C13.0099 9.82158 15.1304 8.14742 17.0254 6.07508C17.5365 4.84067 16.0262 5.881 15.528 6.19975C12.7907 8.08608 10.1204 10.0876 7.23437 11.7454C5.76021 12.5569 4.04204 11.8634 2.56854 11.4106C1.24735 10.8636 -0.688662 10.3125 0.450505 9.47842L0.450638 9.47833Z'
                            fill='url(#paint0_linear_10628_2882)'
                          />
                          <defs>
                            <linearGradient
                              id='paint0_linear_10628_2882'
                              x1='11.5323'
                              y1='0.674179'
                              x2='11.5323'
                              y2='19.6015'
                              gradientUnits='userSpaceOnUse'
                            >
                              <stop stop-color='#29AAEC' />
                              <stop offset='1' stop-color='#239FDB' />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      Login with Telegram
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
};

export default RewardPage;
