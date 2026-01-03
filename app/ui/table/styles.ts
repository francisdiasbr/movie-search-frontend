import styled from 'styled-components';

export const TableContainer = styled.div`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  flex-grow: 1;
  width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  table-layout: auto;
  width: 100%;
`;

export const Footer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;
