import styled from 'styled-components';

export const Cell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  &:first-child {
    text-align: center;
  }
`;

export const Row = styled.tr``;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
export const TableBody = styled.tbody``;
