import styled, { css, DefaultTheme } from 'styled-components';

import type { ButtonSize, ButtonVariant } from './types';

interface StyledProps {
  $fullWidth: boolean;
  $iconOnly: boolean;
  $loading: boolean;
  $size: ButtonSize;
  $variant: ButtonVariant;
}

const sizes: Record<ButtonSize, string> = {
  small: '28px',
  medium: '36px',
  large: '40px',
};

const variantStyles = (theme: DefaultTheme): Record<ButtonVariant, ReturnType<typeof css>> => ({
  primary: css`
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.primary.contrastText};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.primary.dark};
    }
  `,
  secondary: css`
    background-color: ${theme.colors.secondary.main};
    color: ${theme.colors.secondary.contrastText};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.secondary.dark};
    }
  `,
  outline: css`
    background-color: transparent;
    border-color: ${theme.colors.neutral.level7};
    color: ${theme.colors.neutral.level1};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.background.surface};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.neutral.level11};
    }
  `,
  transparent: css`
    background-color: transparent;
    color: ${theme.colors.neutral.level1};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.background.surface};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.neutral.level11};
    }
  `,
  danger: css`
    background-color: ${theme.colors.error.main};
    color: ${theme.colors.error.contrastText};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.error.dark};
    }
  `,
  success: css`
    background-color: ${theme.colors.success.main};
    color: ${theme.colors.success.contrastText};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.success.dark};
    }
  `,
});

export const StyledButton = styled.button<StyledProps>`
  align-items: center;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: none;
  cursor: pointer;
  display: inline-flex;
  font-family: ${({ theme }) => theme.fonts.fontSecondary};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fonts.regular};
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;
  line-height: 1;
  min-height: ${({ $size }) => sizes[$size]};
  padding: 0 ${({ $iconOnly, theme }) => ($iconOnly ? 0 : theme.spacing.md)};
  text-decoration: none;
  width: ${({ $iconOnly, $size }) => ($iconOnly ? sizes[$size] : 'auto')};
  position: relative;

  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}

  ${({ $variant, theme }) => variantStyles(theme)[$variant]}

  &:hover:not(:disabled) {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  }

  &:active:not(:disabled) {
    opacity: 0.7;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral.level9};
    border-color: transparent;
    box-shadow: none;
    color: ${({ theme }) => theme.colors.neutral.level6};
    cursor: not-allowed;
    opacity: 1;
  }

  ${({ $loading }) =>
    $loading &&
    css`
      color: transparent;
    `}
`;

export const Content = styled.span<{ $show: boolean }>`
  align-items: center;
  display: inline-flex;
  gap: ${({ theme }) => theme.spacing.sm};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
`;

export const IconWrapper = styled.span`
  align-items: center;
  display: inline-flex;
  height: 18px;
  width: 18px;

  & > svg {
    height: 18px;
    width: 18px;
  }
`;

export const LoadingWrapper = styled.span`
  display: inline-flex;
  inset: 0;
  position: absolute;
  align-items: center;
  justify-content: center;
`;
