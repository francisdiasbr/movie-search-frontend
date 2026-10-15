import styled from 'styled-components';

export const Header = styled.th`
  background-color: ${({ theme }) => theme.colors.secondary.light};
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary.main};
  color: ${({ theme }) => theme.colors.secondary.contrastText};
  font-family: ${({ theme }) => theme.fonts.fontPrimary};
  font-weight: ${({ theme }) => theme.fonts.bold};
  padding: ${({ theme }) => theme.spacing(1.25)};
  text-align: center;

  &:first-child {
    text-align: center;
  }
`;
