import styled from 'styled-components';

export const Header = styled.th<{ width?: string; minWidth?: string }>`
  background-color: #f4f4f4;
  border-bottom: 2px solid #ddd;
  font-weight: bold;
  padding: 10px;
  text-align: left;
  width: ${({ width }) => width || 'auto'};
  min-width: ${({ minWidth }) => minWidth || 'auto'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:first-child {
    text-align: center;
  }
`;