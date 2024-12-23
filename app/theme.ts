import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
  xs: '320px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

const colors = {
  primary: {
    50: '#e0f7fa',
    100: '#128bb5',
    200: '#0f7a9c',
    300: '#0c6883',
    400: '#0a5770',
    500: '#08465d',
    600: '#063c4a',
    700: '#053239',
    800: '#04282a',
    900: '#031e1b',
  },
  secondary: {
    50: '#f5f5f5',
    100: '#e0e0e0',
    200: '#c1c1c1',
    300: '#a0a0a0',
    400: '#7f7f7f',
    500: '#5f5f5f',
    600: '#4c4c4c',
    700: '#333333',
    800: '#1a1a1a',
    900: '#0d0d0d',
  },
  tertiary: {
    50: '#ffe2e7',
    100: '#ffb3bb',
    200: '#fc8393',
    300: '#f9526d',
    400: '#f6224b',
    500: '#dd0939',
    600: '#ad0320',
    700: '#7c000e',
    800: '#4d0002',
    900: '#200400',
  },
  quaternary: {
    50: '#fff8e1',
    100: '#deb522', // Amarelo do IMDb
    200: '#c6a700',
    300: '#b59400',
    400: '#a68f00',
    500: '#9a7f00',
    600: '#8c6f00',
    700: '#7f5f00',
    800: '#715000',
    900: '#634000',
  },
  quininary: {
    50: '#e2fffa',
    100: '#b3ffeb',
    200: '#83fccb',
    300: '#52f9b6',
    400: '#22f6a9',
    500: '#09ddc5',
    600: '#03ad9c',
    700: '#007c6f',
    800: '#004d46',
    900: '#00201c',
  },
};

const components = {
  Input: {
    variants: {
      outline: {
        field: {
          focusBorderColor: 'primary.50',
          boxShadow: 'none',
          borderWidth: '2px',
          _focus: {
            borderColor: 'primary.50',
            boxShadow: 'none',
          },
          _focusVisible: {
            boxShadow: 'none',
            borderColor: 'primary.50',
          },
        },
      },
    },
  },
};

const theme = extendTheme({ breakpoints, colors, components });

export default theme;
