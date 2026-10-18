import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

export const Cell = styled.td`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.level9};
  padding: ${({ theme }) => theme.spacing(1.25)};
`;

export const Row = styled.tr`
  height: 50px;
`;

export const Skeleton = styled.div`
  animation: ${pulse} 1.5s ease-in-out infinite;
  background: ${({ theme }) => theme.colors.neutral.level9};
  border-radius: ${({ theme }) => theme.radius.sm};
  height: 10px;
  width: 100%;
`;
