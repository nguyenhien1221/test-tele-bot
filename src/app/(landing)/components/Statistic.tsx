/* eslint-disable @next/next/no-img-element */
'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

const BASE_START_TIME = 1727924400000;
const BASE_USERS = 30_125_924;
const BASE_TASKS = 2_152_573_846;
const BASE_ONLINE = 5_083_562;
const USERS_INCREASED_PER_SEC = 1.15;
const TASKS_INCREASED_PER_SEC = 8.75;
const ONLINE_INCREASED_PER_SEC = 0.35;
const ONLINE_MAX_DIFF_A_DAY = 500_000;

const calculateStats = () => {
  const currentTimestamp = new Date().getTime();
  const secPerUnit = (60 * 60 * 24) / 6.283;
  const timeDiffByUnit = (currentTimestamp - BASE_START_TIME) / secPerUnit / 1000;

  const tasks =
    BASE_TASKS +
    TASKS_INCREASED_PER_SEC * secPerUnit * (timeDiffByUnit - Math.sin(timeDiffByUnit - Math.sin(timeDiffByUnit)));
  const users =
    BASE_USERS +
    USERS_INCREASED_PER_SEC * secPerUnit * (timeDiffByUnit - Math.sin(timeDiffByUnit - Math.sin(timeDiffByUnit)));
  const online =
    BASE_ONLINE +
    (ONLINE_MAX_DIFF_A_DAY / 2) * Math.sin(timeDiffByUnit - Math.sin(timeDiffByUnit)) +
    ONLINE_INCREASED_PER_SEC * secPerUnit * timeDiffByUnit;

  return { users: Math.floor(users), tasks: Math.floor(tasks), online: Math.floor(online) };
};

const Statistic = () => {
  const initStats = calculateStats();
  const [mounted, setMounted] = useState<boolean>(false);
  const [currentUsers, setCurrentUsers] = useState<number>(mounted ? initStats.users || BASE_USERS : BASE_USERS);
  const [currentTasks, setCurrentTasks] = useState<number>(mounted ? initStats.tasks || BASE_TASKS : BASE_TASKS);
  const [currentOnline, setCurrentOnline] = useState<number>(mounted ? initStats.online || BASE_ONLINE : BASE_ONLINE);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const { users, tasks, online } = calculateStats();
      setCurrentUsers(users);
      setCurrentTasks(tasks);
      setCurrentOnline(online);
    }, 173);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div id='flagship' className='relative flex w-full justify-center xs:mb-0 xs:mt-[52px] lg:mb-[134px]'>
        <div className={clsx('flag_ship_container')}></div>
        <div className='absolute xs:-top-2 lg:top-[6%]'>
          <svg width='223' height='73' viewBox='0 0 223 73' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M13.63 6.82C13.63 3.05 10.58 0 6.82 0C3.06 0 0 3.05 0 6.82' fill='#2F7200' />
            <g filter='url(#filter0_d_10278_1761)'>
              <path
                d='M38.6203 0H6.82031C10.5803 0 13.6403 3.05 13.6403 6.82V60C13.6403 65.5229 18.1175 70 23.6403 70H95H199C204.523 70 209 65.5229 209 60V6.82C209 3.06 212.05 0 215.82 0L38.6303 0H38.6203Z'
                fill='#6EB73B'
              />
            </g>
            <path d='M209 6.82C209 3.05 212.05 0 215.82 0C219.59 0 222.64 3.05 222.64 6.82' fill='#2F7200' />
            <path
              d='M52.8674 23.76V26.736H43.4274V33.296H50.7874V36.272H43.4274V46H39.7794V23.76H52.8674ZM61.1761 22.32V46H57.5281V22.32H61.1761ZM66.0296 37.104C66.0296 35.3333 66.3923 33.7653 67.1176 32.4C67.8643 31.0347 68.867 29.9787 70.1256 29.232C71.4056 28.464 72.8136 28.08 74.3496 28.08C75.7363 28.08 76.9416 28.3573 77.9656 28.912C79.011 29.4453 79.843 30.1173 80.4616 30.928V28.368H84.1416V46H80.4616V43.376C79.843 44.208 79.0003 44.9013 77.9336 45.456C76.867 46.0107 75.651 46.288 74.2856 46.288C72.771 46.288 71.3843 45.904 70.1256 45.136C68.867 44.3467 67.8643 43.2587 67.1176 41.872C66.3923 40.464 66.0296 38.8747 66.0296 37.104ZM80.4616 37.168C80.4616 35.952 80.2056 34.896 79.6936 34C79.203 33.104 78.5523 32.4213 77.7416 31.952C76.931 31.4827 76.0563 31.248 75.1176 31.248C74.179 31.248 73.3043 31.4827 72.4936 31.952C71.683 32.4 71.0216 33.072 70.5096 33.968C70.019 34.8427 69.7736 35.888 69.7736 37.104C69.7736 38.32 70.019 39.3867 70.5096 40.304C71.0216 41.2213 71.683 41.9253 72.4936 42.416C73.3256 42.8853 74.2003 43.12 75.1176 43.12C76.0563 43.12 76.931 42.8853 77.7416 42.416C78.5523 41.9467 79.203 41.264 79.6936 40.368C80.2056 39.4507 80.4616 38.384 80.4616 37.168ZM97.3171 28.08C98.6825 28.08 99.8878 28.3573 100.933 28.912C102 29.4453 102.832 30.1173 103.429 30.928V28.368H107.109V46.288C107.109 47.9093 106.768 49.3493 106.085 50.608C105.402 51.888 104.41 52.8907 103.109 53.616C101.829 54.3413 100.293 54.704 98.5011 54.704C96.1118 54.704 94.1278 54.1387 92.5491 53.008C90.9705 51.8987 90.0745 50.384 89.8611 48.464H93.4771C93.7545 49.3813 94.3411 50.1173 95.2371 50.672C96.1545 51.248 97.2425 51.536 98.5011 51.536C99.9731 51.536 101.157 51.088 102.053 50.192C102.97 49.296 103.429 47.9947 103.429 46.288V43.344C102.81 44.176 101.968 44.88 100.901 45.456C99.8558 46.0107 98.6611 46.288 97.3171 46.288C95.7811 46.288 94.3731 45.904 93.0931 45.136C91.8345 44.3467 90.8318 43.2587 90.0851 41.872C89.3598 40.464 88.9971 38.8747 88.9971 37.104C88.9971 35.3333 89.3598 33.7653 90.0851 32.4C90.8318 31.0347 91.8345 29.9787 93.0931 29.232C94.3731 28.464 95.7811 28.08 97.3171 28.08ZM103.429 37.168C103.429 35.952 103.173 34.896 102.661 34C102.17 33.104 101.52 32.4213 100.709 31.952C99.8985 31.4827 99.0238 31.248 98.0851 31.248C97.1465 31.248 96.2718 31.4827 95.4611 31.952C94.6505 32.4 93.9891 33.072 93.4771 33.968C92.9865 34.8427 92.7411 35.888 92.7411 37.104C92.7411 38.32 92.9865 39.3867 93.4771 40.304C93.9891 41.2213 94.6505 41.9253 95.4611 42.416C96.2931 42.8853 97.1678 43.12 98.0851 43.12C99.0238 43.12 99.8985 42.8853 100.709 42.416C101.52 41.9467 102.17 41.264 102.661 40.368C103.173 39.4507 103.429 38.384 103.429 37.168ZM119.581 46.288C118.194 46.288 116.946 46.0427 115.837 45.552C114.749 45.04 113.885 44.3573 113.245 43.504C112.605 42.6293 112.263 41.6587 112.221 40.592H115.997C116.061 41.3387 116.413 41.968 117.053 42.48C117.714 42.9707 118.535 43.216 119.517 43.216C120.541 43.216 121.33 43.024 121.885 42.64C122.461 42.2347 122.749 41.7227 122.749 41.104C122.749 40.4427 122.429 39.952 121.789 39.632C121.17 39.312 120.178 38.96 118.813 38.576C117.49 38.2133 116.413 37.8613 115.581 37.52C114.749 37.1787 114.023 36.656 113.405 35.952C112.807 35.248 112.509 34.32 112.509 33.168C112.509 32.2293 112.786 31.376 113.341 30.608C113.895 29.8187 114.685 29.2 115.709 28.752C116.754 28.304 117.949 28.08 119.293 28.08C121.298 28.08 122.909 28.592 124.125 29.616C125.362 30.6187 126.023 31.9947 126.109 33.744H122.461C122.397 32.9547 122.077 32.3253 121.501 31.856C120.925 31.3867 120.146 31.152 119.165 31.152C118.205 31.152 117.469 31.3333 116.957 31.696C116.445 32.0587 116.189 32.5387 116.189 33.136C116.189 33.6053 116.359 34 116.701 34.32C117.042 34.64 117.458 34.896 117.949 35.088C118.439 35.2587 119.165 35.4827 120.125 35.76C121.405 36.1013 122.45 36.4533 123.261 36.816C124.093 37.1573 124.807 37.6693 125.405 38.352C126.002 39.0347 126.311 39.9413 126.333 41.072C126.333 42.0747 126.055 42.9707 125.501 43.76C124.946 44.5493 124.157 45.168 123.133 45.616C122.13 46.064 120.946 46.288 119.581 46.288ZM140.674 28.08C142.018 28.08 143.213 28.368 144.258 28.944C145.325 29.52 146.157 30.3733 146.754 31.504C147.373 32.6347 147.682 34 147.682 35.6V46H144.066V36.144C144.066 34.5653 143.672 33.36 142.882 32.528C142.093 31.6747 141.016 31.248 139.65 31.248C138.285 31.248 137.197 31.6747 136.386 32.528C135.597 33.36 135.202 34.5653 135.202 36.144V46H131.554V22.32H135.202V30.416C135.821 29.6693 136.6 29.0933 137.538 28.688C138.498 28.2827 139.544 28.08 140.674 28.08ZM155.472 26.032C154.81 26.032 154.256 25.808 153.808 25.36C153.36 24.912 153.136 24.3573 153.136 23.696C153.136 23.0347 153.36 22.48 153.808 22.032C154.256 21.584 154.81 21.36 155.472 21.36C156.112 21.36 156.656 21.584 157.104 22.032C157.552 22.48 157.776 23.0347 157.776 23.696C157.776 24.3573 157.552 24.912 157.104 25.36C156.656 25.808 156.112 26.032 155.472 26.032ZM157.264 28.368V46H153.616V28.368H157.264ZM166.981 30.96C167.6 30.1493 168.442 29.4667 169.509 28.912C170.576 28.3573 171.781 28.08 173.125 28.08C174.661 28.08 176.058 28.464 177.317 29.232C178.597 29.9787 179.6 31.0347 180.325 32.4C181.05 33.7653 181.413 35.3333 181.413 37.104C181.413 38.8747 181.05 40.464 180.325 41.872C179.6 43.2587 178.597 44.3467 177.317 45.136C176.058 45.904 174.661 46.288 173.125 46.288C171.781 46.288 170.586 46.0213 169.541 45.488C168.496 44.9333 167.642 44.2507 166.981 43.44V54.384H163.333V28.368H166.981V30.96ZM177.701 37.104C177.701 35.888 177.445 34.8427 176.933 33.968C176.442 33.072 175.781 32.4 174.949 31.952C174.138 31.4827 173.264 31.248 172.325 31.248C171.408 31.248 170.533 31.4827 169.701 31.952C168.89 32.4213 168.229 33.104 167.717 34C167.226 34.896 166.981 35.952 166.981 37.168C166.981 38.384 167.226 39.4507 167.717 40.368C168.229 41.264 168.89 41.9467 169.701 42.416C170.533 42.8853 171.408 43.12 172.325 43.12C173.264 43.12 174.138 42.8853 174.949 42.416C175.781 41.9253 176.442 41.2213 176.933 40.304C177.445 39.3867 177.701 38.32 177.701 37.104Z'
              fill='white'
            />
            <defs>
              <filter
                id='filter0_d_10278_1761'
                x='5.82031'
                y='0'
                width='211'
                height='73'
                filterUnits='userSpaceOnUse'
                color-interpolation-filters='sRGB'
              >
                <feFlood flood-opacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hardAlpha'
                />
                <feOffset dy='2' />
                <feGaussianBlur stdDeviation='0.5' />
                <feComposite in2='hardAlpha' operator='out' />
                <feColorMatrix type='matrix' values='0 0 0 0 0.184314 0 0 0 0 0.447059 0 0 0 0 0 0 0 0 1 0' />
                <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_10278_1761' />
                <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_10278_1761' result='shape' />
              </filter>
            </defs>
          </svg>
        </div>
        <div className={clsx('flex w-[1200px] items-center lg:w-[800px] xl:w-[1200px]', 'xs:flex-col lg:flex-row')}>
          <div className='relative z-40 xs:mt-[100px] lg:mt-[190px]'>
            <img
              className='block overflow-hidden xs:h-[189px] xs:w-[186px] lg:h-[363px] lg:w-[358px] dark:hidden'
              src='/media/seed_icon.png'
              alt=''
            ></img>
            <svg
              className='hidden dark:block'
              width='362'
              height='367'
              viewBox='0 0 362 367'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M43.5612 92.8216L196.335 2L320.159 96.4171L338.586 110.468C340.411 111.86 341.851 113.694 342.769 115.798L358.39 151.589C359.44 153.997 359.765 156.659 359.324 159.248L348.821 220.889L276.718 310.133C275.874 311.179 274.878 312.092 273.763 312.843L196.335 365L101.909 312.596C100.85 312.008 99.8757 311.281 99.0114 310.433L10.0256 223.181L2 142.387L43.5612 92.8216Z'
                fill='#000'
                fill-opacity='1'
              />
              <path
                d='M196.335 2L43.5612 92.8216M196.335 2V19.7632M196.335 2L320.159 96.4171M43.5612 92.8216L2 142.387M43.5612 92.8216L81.6829 148.117M2 142.387L10.0256 223.181M2 142.387L30.5 205.5M10.0256 223.181L99.0114 310.433C99.8757 311.281 100.85 312.008 101.909 312.596L196.335 365M10.0256 223.181L30.5 205.5M196.335 365L273.763 312.843C274.878 312.092 275.874 311.179 276.718 310.133L348.821 220.889M196.335 365L118.085 260.14M196.335 365L279.457 256.129M348.821 220.889L359.324 159.248C359.765 156.659 359.44 153.997 358.39 151.589L342.769 115.798C341.851 113.694 340.411 111.86 338.586 110.468L320.159 96.4171M348.821 220.889L297.228 151.555M348.821 220.889L279.457 256.129M196.335 19.7632L297.228 151.555M196.335 19.7632L200.921 188.8M196.335 19.7632L81.6829 148.117M297.228 151.555L320.159 96.4171M297.228 151.555L200.921 188.8M279.457 256.129L118.085 260.14M279.457 256.129L200.921 188.8M118.085 260.14L30.5 205.5M118.085 260.14L200.921 188.8M30.5 205.5L81.6829 148.117M200.921 188.8L81.6829 148.117'
                stroke='#6EB73B'
                stroke-width='4'
                stroke-linejoin='round'
              />
            </svg>

            <div className='absolute right-[17%] top-10 z-40 xs:opacity-0 lg:opacity-100'>
              <svg width='44' height='44' viewBox='0 0 44 44' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <circle cx='22' cy='22' r='22' fill='#6EB73B' fill-opacity='0.1' />
                <circle cx='22' cy='22' r='15' fill='#6EB73B' fill-opacity='0.6' />
                <circle cx='22' cy='22' r='9' fill='#6EB73B' />
              </svg>
            </div>

            <div className='absolute -right-[4%] top-[46%] z-40 xs:opacity-0 lg:opacity-100'>
              <svg width='44' height='44' viewBox='0 0 44 44' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <circle cx='22' cy='22' r='22' fill='#E2CE17' fill-opacity='0.1' />
                <circle cx='22' cy='22' r='15' fill='#E2CE17' fill-opacity='0.6' />
                <circle cx='22' cy='22' r='9' fill='#E2CE17' />
              </svg>
            </div>
            <div className='absolute bottom-[9%] right-[17%] z-40 xs:opacity-0 lg:opacity-100'>
              <svg width='44' height='44' viewBox='0 0 44 44' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <circle cx='22' cy='22' r='22' fill='#2CAEDD' fill-opacity='0.1' />
                <circle cx='22' cy='22' r='15' fill='#2CAEDD' fill-opacity='0.6' />
                <circle cx='22' cy='22' r='9' fill='#2CAEDD' />
              </svg>
            </div>
          </div>
          <div className=' flex-1 overflow-hidden xs:mt-[700px] lg:mt-[190px]'>
            <div
              className={clsx(
                'absolute left-[10%] top-[45%] h-1 w-[60%] bg-[#6EB73B]  lg:left-[30%] xl:left-[20%] 2xl:left-[30%] 2xl:w-[51%]',
                'xs:w-[80%] lg:w-[60%]'
              )}
            >
              <div className='absolute bottom-0 text-start text-[#759361] xs:left-0 lg:left-[30%] dark:text-[#9CB28D]'>
                <div>
                  <p className='font-medium tracking-tight xs:text-[26px] xl:text-[30px]'>
                    {currentUsers.toLocaleString()}
                  </p>
                  <p className='font-normal uppercase leading-7 tracking-tight xs:mb-6 xs:text-base lg:mb-4 xl:text-[20px]'>
                    Total Seedizens
                  </p>
                </div>
              </div>
            </div>
            <div
              className={clsx(
                'absolute left-[10%]  h-1 w-[60%] bg-[#E2CE17] lg:left-[30%] xl:left-[20%] 2xl:left-[30%] 2xl:w-[51%]',
                'xs:top-[56%] xs:w-[80%] lg:top-[68%] lg:w-[60%]'
              )}
            >
              <div className='absolute bottom-0 text-start text-[#759361] xs:left-0 lg:left-[30%] dark:text-[#9CB28D]'>
                <div>
                  <p className='font-medium tracking-tight xs:text-[26px] xl:text-[30px]'>
                    {currentTasks.toLocaleString()}
                  </p>
                  <p className='font-normal uppercase leading-7 tracking-tight xs:mb-6 xs:text-base lg:mb-4 xl:text-[20px]'>
                    COMPLETED missions
                  </p>
                </div>
              </div>
            </div>
            <div
              className={clsx(
                'absolute left-[10%] h-1 w-[60%] bg-[#2CAEDD] lg:left-[30%] xl:left-[20%] 2xl:left-[30%] 2xl:w-[51%]',
                'xs:top-[67%] xs:w-[80%] lg:top-[90%] lg:w-[60%]'
              )}
            >
              <div className='absolute bottom-0 text-start text-[#759361] xs:left-0 lg:left-[30%] dark:text-[#9CB28D]'>
                <div>
                  <p className='font-medium tracking-tight xs:text-[26px] xl:text-[30px]'>
                    {currentOnline.toLocaleString()}
                  </p>
                  <p className='font-normal uppercase leading-7 tracking-tight xs:mb-6 xs:text-base lg:mb-4 xl:text-[20px]'>
                    Online Seedizens
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistic;
