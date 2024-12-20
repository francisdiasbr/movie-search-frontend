import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  @media (min-width: 1024px) {
    padding: 8px;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
  @media (min-width: 1024px) {
    flex-direction: column;
    gap: 0;
  }
`;