'use client';
import '../app/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import store from '@/store/store';
import ThemeProvider from '@/components/ThemeProvider';

import Header from '@/components/Header';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <html lang='en'>
          <body>
            <>
              <ToastContainer />
              <Header />
              {children}
            </>
          </body>
        </html>
      </ThemeProvider>
    </Provider>
  );
}
