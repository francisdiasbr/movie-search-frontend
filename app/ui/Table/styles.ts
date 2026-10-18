import styled from 'styled-components';

export const Footer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const StyledTable = styled.table`
  background: ${({ theme }) => theme.colors.background.surface};
  border-collapse: collapse;
  table-layout: auto;
  width: 100%;
`;

export const TableContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  min-height: 400px;
  overflow-x: auto;
  width: 100%;
`;
