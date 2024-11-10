import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

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
  tertiary: {
   "50": "#e2fffa",
    "100": "#b3ffeb",
    "200": "#83fccb",
    "300": "#52f9b6",
    "400": "#22f6a9",
    "500": "#09ddc5",
    "600": "#03ad9c",
    "700": "#007c6f",
    "800": "#004d46",
    "900": "#00201c"
  }
};

const components = {
  Input: {
    variants: {
      outline: {
        field: {
          focusBorderColor: "primary.200", 
          boxShadow: "none",
          borderWidth: "2px",
          _focus: {
            borderColor: "primary.200", 
            boxShadow: "none",
          },
          _focusVisible: {
            boxShadow: "none",
            borderColor: "primary.200",
          },
        },
      },
    },
  },
};

const theme = extendTheme({ colors, components });

export default theme;
