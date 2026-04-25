import styled from 'styled-components';

export const Nav = styled.nav`
  background: #fff;
  left: 0;
  padding: 12px 16px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
`;

export const ContentWrapper = styled.div`
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 16px;
  padding-top: 60px;
`;

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
