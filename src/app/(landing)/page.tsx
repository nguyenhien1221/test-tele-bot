import MainContent from './components/MainContent';
import '../starfield.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main className='relative flex min-h-screen max-w-[100vw] flex-col overflow-hidden bg-[#F2FFE0] dark:bg-[#000]'>
      <div className='starfield opacity-0 dark:opacity-100'>
        <div className='stars'></div>
      </div>

      <div className='relative z-10 flex min-h-screen flex-col'>
        <Header />
        <MainContent />
        <Footer />
      </div>
    </main>
  );
}
