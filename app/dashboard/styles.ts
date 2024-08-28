import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh; 
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row; 
    overflow: hidden; 
  }
`;

export const SideNavWrapper = styled.div`
  flex-shrink: 0; 
  width: 100%; 
  @media (min-width: 768px) {
    width: 16rem; 
  }
`;

export const ContentWrapper = styled.div`
  // background-color: yellow;
  flex-grow: 1;
  padding: 24px;

  @media (min-width: 768px) {
    overflow-y: auto;
    padding: 48px;
  }
`;