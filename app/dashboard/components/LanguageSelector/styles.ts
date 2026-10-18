import styled, { css } from 'styled-components';

export const Group = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.primary.contrastText};
  border-radius: ${({ theme }) => theme.radius.pill};
  display: flex;
  overflow: hidden;
`;

export const Option = styled.button<{ $active: boolean }>`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary.contrastText};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.fontPrimary};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fonts.medium};
  line-height: 1;
  padding: ${({ theme }) => theme.spacing(0.75)} ${({ theme }) => theme.spacing(1.5)};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary.light};
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      background: ${theme.colors.primary.contrastText};
      color: ${theme.colors.primary.main};

      &:hover {
        color: ${theme.colors.primary.main};
      }
    `}
`;
