import Link, { LinkProps } from 'next/link';
import styled from 'styled-components';

// Excluir `isActive` do LinkProps
interface StyledLinkProps extends LinkProps {
  isActive: boolean;
}

export const StyledLink = styled(Link).withConfig({
  shouldForwardProp: prop => prop !== 'isActive',
})<StyledLinkProps>`
  display: flex;
  height: 48px;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary[100] : theme.colors.secondary[50]};
  padding: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary[50] : 'inherit'};

  &:hover {
    background-color: ${({ theme, isActive }) =>
      isActive ? theme.colors.primary[100] : theme.colors.primary[50]};
    color: ${({ theme }) => theme.colors.primary[900]};
  }

  @media (min-width: 768px) {
    flex-grow: 0;
    justify-content: flex-start;
    padding: 8px 12px;
  }
`;

export const LinkIconWrapper = styled.div`
  width: 24px;
`;

export const LinkText = styled.p`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;
