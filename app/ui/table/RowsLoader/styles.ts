import styled from 'styled-components';

export const Cell = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 10px;
  text-align: left;
  &:first-child {
    text-align: center;
  }
`;

export const Row = styled.tr`
  height: 50px;
`;
