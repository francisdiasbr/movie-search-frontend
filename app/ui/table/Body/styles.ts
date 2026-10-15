import styled from 'styled-components';

export const Cell = styled.td`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.level9};
  text-align: center;

  &:first-child {
    text-align: center;
  }
`;

export const Row = styled.tr`
  height: 30px;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
    font-weight: ${({ theme }) => theme.fonts.bold};
  }
`;

export const SpinnerCell = styled.td`
  padding: ${({ theme }) => theme.spacing(7.5)};
  text-align: center;
  vertical-align: middle;
`;

export const TableBody = styled.tbody`
  min-height: 300px;
  width: 100%;
`;
