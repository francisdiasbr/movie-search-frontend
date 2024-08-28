'use client';

import { ChakraProvider as ChakraUIProvider } from '@chakra-ui/react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from './theme';

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraUIProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top' } }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ChakraUIProvider>
  );
}