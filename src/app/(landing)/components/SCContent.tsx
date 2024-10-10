import clsx from 'clsx';
import React from 'react';

const SCContent = () => {
  const scContentitems = [
    {
      sub_title: 'Advise',
      main_title: 'SC Advisory',
      content:
        'Experienced founders, experts, and advisors in business strategy, product development, market access, and problem-solving',
    },
    {
      sub_title: 'Invest',
      main_title: 'SC Investor network',
      content:
        'Pitch your product and business plan to a large group of investors. Connect with backers, VCs, community funding, industry partners, CEX, and launchpads',
    },
    {
      sub_title: 'Build',
      main_title: 'SC Labs',
      content:
        'At Playable Studio, we turn your ideas into successful Telegram mini-apps with expert consulting on go-to-market plans and business models.',
    },
  ];
  return (
    <div id='whatweofer' className='flex w-full justify-center'>
      <div className='max-w-[1200px]'>
        <p className='xl:px-auto text-[30px] text-[#25311D] xs:w-full xs:px-4 xs:text-center  xs:text-base sm:px-4 lg:text-[30px] lg:leading-[45px] dark:text-[#E7F5D3]'>
          SC is led by visionary founders who built their dreams while launching and scaling startups, embodying the
          Web3 spirit of innovation and community empowerment
        </p>
        <div
          className={clsx(
            'mt-[72px] grid w-full grid-cols-3 gap-6',
            'xl:px-auto xs:grid-cols-1 xs:px-4 sm:grid-cols-1 sm:px-4 lg:grid-cols-3'
          )}
        >
          {scContentitems.map((item, index) => (
            <div
              key={index}
              className='col-span-1 flex w-full flex-col items-center rounded-3xl border-[1px] border-[#E1EFCA] bg-[#E8F5D3] p-8 dark:border-[#E1EFCA14] dark:bg-[#E8F5D30A]'
            >
              <div className='mb-[68px] flex flex-col items-center justify-center gap-6 text-center text-[#25311D] dark:text-[#E7F5D3]'>
                <p className='text-sm uppercase'>{item.sub_title}</p>
                <p className='text-[30px]'>{item.main_title}</p>
                <p>{item.content}</p>
              </div>
              <div className='h-1 w-[85px] rounded-xl bg-[#6EB73B]'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SCContent;
