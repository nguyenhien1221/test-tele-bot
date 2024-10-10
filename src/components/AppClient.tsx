'use client';

import { Toaster } from 'react-hot-toast';

const AppClient = () => {
  return (
    <Toaster
      toastOptions={{
        duration: 1500,
        style: {
          minWidth: '300px',
          maxWidth: '70%',
        },
      }}
    />
  );
};

export default AppClient;
