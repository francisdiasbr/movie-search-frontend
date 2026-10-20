import styled, { css } from 'styled-components';

import type { SelectSize } from './types';

const heights: Record<SelectSize, string> = {
  medium: '36px',
  small: '28px',
};

export const Wrapper = styled.span<{ $size: SelectSize }>`
  display: inline-flex;
  height: ${({ $size }) => heights[$size]};
  position: relative;
`;

export const Native = styled.select<{ $active: boolean; $placeholder: boolean; $size: SelectSize }>`
  appearance: none;
  background: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid ${({ theme }) => theme.colors.neutral.level7};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ $placeholder, theme }) => ($placeholder ? theme.colors.neutral.level5 : theme.colors.neutral.level2)};
  cursor: pointer;
  font-family: inherit;
  font-size: ${({ $size }) => ($size === 'small' ? '0.875rem' : '1rem')};
  height: 100%;
  line-height: 1;
  min-width: 0;
  padding: 0 ${({ theme }) => theme.spacing(4.5)} 0 ${({ theme }) => theme.spacing(1.5)};
  width: 100%;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.neutral.level5};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary.main};
    outline: none;
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      background: ${theme.colors.primary.light};
      border-color: ${theme.colors.primary.main};
      color: ${theme.colors.primary.dark};
      font-weight: ${theme.fonts.medium};
    `}
`;

const trailing = css`
  align-items: center;
  display: inline-flex;
  font-size: 0.75rem;
  height: 100%;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: ${({ theme }) => theme.spacing(4)};
`;

export const Chevron = styled.span`
  ${trailing}
  color: ${({ theme }) => theme.colors.neutral.level5};
  pointer-events: none;
`;

export const Clear = styled.button`
  ${trailing}
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.dark};
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.error.main};
  }
`;
