import styled from 'styled-components';

export const Cell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;

  &:first-child {
    text-align: center;
  }
`;

export const Row = styled.tr`
  height: 50px;

  &:hover {
    background: #f9f9f9;
    font-weight: bold;
  }
`;

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

export const TableBody = styled.tbody`
  min-height: 300px;
  width: 100%;
`;