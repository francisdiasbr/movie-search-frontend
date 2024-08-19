import styled from 'styled-components';

import { TypographyProps } from './types';

const fontStyles = {
  'heading-xs': {
    fontSize: 12,
    lineHeight: '13px',
    fontWeight: '700',
  },
  'heading-sm': {
    fontSize: 16,
    lineHeight: '16px',
    fontWeight: '700',
  },
  'heading-md': {
    fontSize: 18,
    lineHeight: '20px',
    fontWeight: '700',
  },
  'heading-lg': {
    fontSize: 20,
    lineHeight: '25px',
    fontWeight: '700',
  },
  'heading-xl': {
    fontSize: 24,
    lineHeight: '30px',
    fontWeight: '700',
  },
  'heading-2xl': {
    fontSize: 28,
    lineHeight: '32px',
    fontWeight: '700',
  },
  'text-12': {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: '13px',
  },
  'text-14': {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: '17px',
  },
  'text-md': {
    fontWeight: '400',
    fontSize: 15,
    lineHeight: '23px',
  },
  'text-lg': {
    fontWeight: '400',
    fontSize: 19,
    lineHeight: '25px',
  },
  'text-xl': {
    fontWeight: '400',
    fontSize: 23,
    lineHeight: '30px',
  },
  'text-2xl': {
    fontWeight: '400',
    fontSize: 25,
    lineHeight: '32px',
  },
};

export const TextStyled = styled.p<TypographyProps>`
  ${({ variant }) => fontStyles[variant as keyof typeof fontStyles]}
  text-decoration-line: ${({ underline }) =>
    underline ? 'underline' : 'none'};
  color: ${({ color }) => color};
`;
