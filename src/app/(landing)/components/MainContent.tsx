'use client';

import Statistic from './Statistic';
import MainTittle from './MainTittle';
import SCContent from './SCContent';

const MainContent = () => {
  return (
    <section className='flex w-full flex-1 flex-col justify-center gap-8 py-4'>
      <MainTittle />
      <SCContent />
      <Statistic />
    </section>
  );
};

export default MainContent;
