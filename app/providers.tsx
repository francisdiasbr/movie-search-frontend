'use client';

import { ChakraProvider as ChakraUIProvider } from '@chakra-ui/react';

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <ChakraUIProvider toastOptions={{ defaultOptions: { position: 'top' } }}>{children}</ChakraUIProvider>;
}
