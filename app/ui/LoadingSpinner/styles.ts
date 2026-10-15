import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const SpinnerContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 200px;
  width: 100%;
`;

export const Spinner = styled.div<{ $color?: string; $size: string; $speed: string; $thickness: string }>`
  animation: ${spin} ${({ $speed }) => $speed} linear infinite;
  border: ${({ $thickness, theme }) => `${$thickness} solid ${theme.colors.neutral.level9}`};
  border-radius: 50%;
  border-top-color: ${({ $color, theme }) => $color ?? theme.colors.primary.main};
  height: ${({ $size }) => $size};
  width: ${({ $size }) => $size};
`;
