import type { Metadata } from 'next';

import StyledComponentsRegistry from '../lib/registry';
import './globals.css';
import { ChakraProvider } from './providers';
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
          <ChakraProvider>
            <StoreProvider>{children}</StoreProvider>
          </ChakraProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
