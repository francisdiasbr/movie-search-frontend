import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  height: 90vh;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
    overflow: hidden;
  }
`;

export const SideNavWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
  @media (min-width: 1024px) {
    width: 16rem;
  }
`;

export const ContentWrapper = styled.div`
  flex-grow: 1;
  padding: 16px;
  overflow: scroll;
  @media (min-width: 1024px) {
    overflow-y: auto;
    padding: 16px;
  }
`;
