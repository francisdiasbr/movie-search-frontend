import styled from 'styled-components';

export const TopBarContainer = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary[100]};
  color: white;
  display: flex;
  height: 90px;
  justify-content: center;
  padding: 0 24px;
  text-align: center;
  width: 100%;
`;