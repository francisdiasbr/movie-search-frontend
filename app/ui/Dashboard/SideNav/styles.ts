import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  @media (min-width: 768px) {
    padding: 8px;
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin-bottom: 8px;
  height: 80px;
  border-radius: 8px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.primary[300]};
  @media (min-width: 768px) {
    height: 160px;
  }
`;

export const LogoContainer = styled.div`
  // width: 128px;
  color: white;
  @media (min-width: 768px) {
    // width: 160px;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  // flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
  @media (min-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const SignOutButton = styled.button`
  display: flex;
  height: 48px;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary[50]};
  padding: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary[600]};
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[100]};
    color: ${({ theme }) => theme.colors.primary[500]};
  }
  @media (min-width: 768px) {
    justify-content: flex-start;
    padding: 8px 12px;
  }
`;