import styled from 'styled-components';

export const Header = styled.th<{ width?: string }>`
  background-color: #f4f4f4;
  border-bottom: 2px solid #ddd;
  font-weight: bold;
  padding: 10px;
  text-align: left;
  width: ${({ width }) => width || 'auto'};
  &:first-child {
    text-align: center;
    width: 150px;
  }
`;