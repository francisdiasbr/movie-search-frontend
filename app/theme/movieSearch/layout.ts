import type { Layout, Spacing } from '../base/layout';

const SPACING_UNIT = 8;

const spacingFn = (multiplier: number) => `${multiplier * SPACING_UNIT}px`;

export const spacing: Spacing = Object.assign(spacingFn, {
  unit: SPACING_UNIT,
  xxs: spacingFn(0.25),
  xs: spacingFn(0.5),
  sm: spacingFn(1),
  md: spacingFn(2),
  lg: spacingFn(3),
  xl: spacingFn(4),
  xxl: spacingFn(6),
});

export const layout: Readonly<Layout> = {
  breakpoints: {
    sm: '600px',
    md: '900px',
    lg: '1200px',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    pill: '999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 2px 4px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 24px rgba(0, 0, 0, 0.2)',
  },
  spacing,
  zIndex: {
    nav: 100,
    dialog: 1000,
    toast: 1100,
  },
};
