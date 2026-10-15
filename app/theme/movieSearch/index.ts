import { colors } from './colors';
import { fonts } from './fonts';
import { layout } from './layout';

export const theme = {
  colors,
  fonts,
  ...layout,
} as const;

export type Theme = typeof theme;
