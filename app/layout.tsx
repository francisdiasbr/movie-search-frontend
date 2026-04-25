import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import StyledComponentsRegistry from '../lib/registry';
import './globals.css';
import StoreProvider from './StoreProvider';

export const metadata: Metadata = {
  description: 'Custom admin panel for Movie Search',
  title: 'The Movie Search',
  icons: {
    icon: '/favicon-32x32.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <StyledComponentsRegistry>
            <StoreProvider>{children}</StoreProvider>
        </StyledComponentsRegistry>
        <Toaster position='bottom-center' />
      </body>
    </html>
  );
}
