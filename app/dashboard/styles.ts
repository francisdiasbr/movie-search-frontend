import styled from 'styled-components';

export const Nav = styled.nav`
  align-items: center;
  background: ${({ theme }) => theme.colors.primary.main};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  justify-content: space-between;
  left: 0;
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing.md};
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.nav};
`;

export const NavList = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  list-style: none;
  margin: 0;
  padding: 0;

  a {
    color: ${({ theme }) => theme.colors.primary.contrastText};
    font-family: ${({ theme }) => theme.fonts.fontPrimary};
    font-weight: ${({ theme }) => theme.fonts.medium};
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.secondary.light};
  }
`;

export const ContentWrapper = styled.div`
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing(7.5)};
`;

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
