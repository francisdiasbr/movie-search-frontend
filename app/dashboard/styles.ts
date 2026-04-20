import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  height: 90vh;
  flex-direction: column;

  @media (min-width: 1024px) {
    overflow: hidden;
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
