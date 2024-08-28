import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
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
};

const theme = extendTheme({ colors });

export default theme;