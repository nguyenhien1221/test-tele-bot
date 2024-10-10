import type { Metadata } from 'next';
import './globals.css';
import clsx from 'clsx';
import AppClient from '@/components/AppClient';
import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

const defaultMetadata = {
  title: 'SEED Combinator for Web3',
  description:
    'The fastest-growing game on Telegram where Early Farmers plant tree, collect SEED, catch worms, raise virtual pets and trade in the marketplace.',
  url: 'https://seeddao.org/',
  thumbnail: '/thumbnail.png',
  siteName: 'seeddao.org',
};

export const metadata: Metadata = {
  title: defaultMetadata.title,
  description: defaultMetadata.description,
  icons: {
    icon: {
      url: '/favicon.ico',
      type: 'image/x-icon',
    },
    shortcut: { url: '/favicon.ico', type: 'image/x-icon' },
  },
  openGraph: {
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    url: defaultMetadata.url,
    siteName: defaultMetadata.siteName,
    images: [
      {
        url: defaultMetadata.thumbnail,
        width: 1280,
        height: 914,
        alt: 'SEED DAO thumbnail',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    images: [defaultMetadata.thumbnail],
  },
  metadataBase: new URL('https://seeddao.org/'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Script src='https://telegram.org/js/telegram-widget.js?21' />
      <body
        className={clsx(
          // sourceCodePro.variable,
          // tomorrow.variable,
          'relative min-h-screen bg-black font-scp text-[#25311D] dark:text-white'
        )}
      >
        {children}
        <AppClient />
      </body>
    </html>
  );
}
