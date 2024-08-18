import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Header = styled.th`
  background-color: #f4f4f4;
  padding: 10px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
  &:first-child {
    text-align: center;
    width: 150px;
  };
`;

export const Row = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const Cell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  &:first-child {
    text-align: center;
  }
`;