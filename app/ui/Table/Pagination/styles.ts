import styled from 'styled-components';

export const PageSize = styled.div`
  margin: 0 ${({ theme }) => theme.spacing.sm};
`;

export const PageValue = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.neutral.level7};
  border-radius: ${({ theme }) => theme.radius.sm};
  min-width: ${({ theme }) => theme.spacing.xl};
  padding: 0 ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;

export const PaginationButtons = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

export const PaginationContainer = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral.level11};
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`;

export const TotalDocs = styled.div`
  color: ${({ theme }) => theme.colors.neutral.level5};
  font-size: 0.875rem;
  min-width: 100px;
  text-align: right;
`;
