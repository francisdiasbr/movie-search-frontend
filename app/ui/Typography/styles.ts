import styled from 'styled-components';

import { TypographyProps } from './types';

const fontStyles = {
  'heading-2xl': {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: '32px',
  },
  'heading-lg': {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: '25px',
  },
  'heading-md': {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: '20px',
  },
  'heading-sm': {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: '16px',
  },
  'heading-xl': {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: '30px',
  },
  'heading-xs': {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: '13px',
  },
  'text-12': {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: '13px',
  },
  'text-14': {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: '17px',
  },
  'text-2xl': {
    fontSize: 25,
    fontWeight: '400',
    lineHeight: '32px',
  },
  'text-lg': {
    fontSize: 19,
    fontWeight: '400',
    lineHeight: '25px',
  },
  'text-md': {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: '23px',
  },
  'text-xl': {
    fontSize: 23,
    fontWeight: '400',
    lineHeight: '30px',
  },
};

export const TextStyled = styled.p<TypographyProps>`
  ${({ variant }) => fontStyles[variant as keyof typeof fontStyles]}
  text-decoration-line: ${({ underline }) =>
    underline ? 'underline' : 'none'};
  color: ${({ color }) => color};
`;
