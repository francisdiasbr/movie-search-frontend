import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import StoreProvider from './StoreProvider';
import StyledComponentsRegistry from '@/lib/registry';
import { ChakraProvider } from './providers';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] });

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
      <body className={`${inter.className} antialiased`}>
        <StyledComponentsRegistry>
          <ChakraProvider>
          <StoreProvider>{children}</StoreProvider>
          </ChakraProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
