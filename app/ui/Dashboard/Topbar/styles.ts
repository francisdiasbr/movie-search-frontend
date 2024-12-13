import styled from 'styled-components';

export const TopBarContainer = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary[300]};
  color: white;
  display: flex;
  height: 70px;
  justify-content: space-between;
  padding: 0 24px;
  width: 100%;
`;