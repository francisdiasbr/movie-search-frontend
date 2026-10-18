import styled from 'styled-components';

export const Header = styled.th<{ $sortable: boolean }>`
  background-color: ${({ theme }) => theme.colors.secondary.light};
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary.main};
  color: ${({ theme }) => theme.colors.secondary.contrastText};
  cursor: ${({ $sortable }) => ($sortable ? 'pointer' : 'default')};
  font-family: ${({ theme }) => theme.fonts.fontPrimary};
  font-weight: ${({ theme }) => theme.fonts.bold};
  padding: ${({ theme }) => theme.spacing(1.25)};
  text-align: center;
  user-select: none;

  &:first-child {
    text-align: center;
  }
`;

export const Label = styled.span`
  align-items: center;
  display: inline-flex;
  gap: ${({ theme }) => theme.spacing.xs};
  justify-content: center;
`;
