import styled from 'styled-components';

export const Results = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
  padding: 0;
`;
