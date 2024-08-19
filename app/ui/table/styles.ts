import styled from "styled-components";

export const TableContainer = styled.div`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const Header = styled.th<{width?: string}>`
  background-color: #f4f4f4;
  border-bottom: 2px solid #ddd;
  font-weight: bold;
  padding: 10px;
  text-align: left;
  width: ${({ width }) => width || 'auto'};
  &:first-child {
    text-align: center;
    width: 150px;
  };
`;

export const Footer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`