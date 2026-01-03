import styled from 'styled-components';

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    background: none;
    border: none;
    cursor: pointer;

    &:hover svg {
      color: #d7d7d7;
    }
  }
`;

export const Cell = styled.td`
  border-bottom: 1px solid #ddd;
  text-align: center;

  &:first-child {
    text-align: center;
  }
`;

export const Row = styled.tr`
  &:hover {
    background: #f9f9f9;
    font-weight: bold;
  }
`;

export const TableBody = styled.tbody`
  min-height: 300px;
  width: 100%;
`;

export const LoadingCell = styled.td`
  padding: 80px 20px;
  text-align: center;
  vertical-align: middle;
  width: 100%;
`;
