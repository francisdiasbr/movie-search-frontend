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
`;
