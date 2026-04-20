import styled from 'styled-components';

export const ContentWrapper = styled.div`
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 16px;
`;

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;

  @media (min-width: 1024px) {
    overflow: hidden;
  }
`;
