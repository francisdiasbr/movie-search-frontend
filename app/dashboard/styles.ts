import styled from 'styled-components';

// Sticky rather than fixed: the content starts right below the bar whatever
// its height, so a bar that wraps on a phone never hides the page title.
export const Nav = styled.nav`
  align-items: center;
  background: ${({ theme }) => theme.colors.primary.main};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing.md};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.nav};
`;

// One line that scrolls sideways when the links do not fit.
export const NavList = styled.ul`
  display: flex;
  flex: 1;
  gap: ${({ theme }) => theme.spacing.lg};
  list-style: none;
  margin: 0;
  min-width: 0;
  overflow-x: auto;
  padding: 0;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  li {
    flex: none;
  }

  a {
    border-bottom: 2px solid transparent;
    color: ${({ theme }) => theme.colors.primary.contrastText};
    font-family: ${({ theme }) => theme.fonts.fontPrimary};
    font-weight: ${({ theme }) => theme.fonts.medium};
    padding-bottom: ${({ theme }) => theme.spacing.xxs};
    text-decoration: none;
    white-space: nowrap;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.secondary.light};
  }

  a[aria-current='page'] {
    border-bottom-color: ${({ theme }) => theme.colors.secondary.light};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const ContentWrapper = styled.div`
  flex-grow: 1;
  overflow-x: hidden;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
`;

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
