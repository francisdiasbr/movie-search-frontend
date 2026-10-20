import styled, { css } from 'styled-components';

export const Toggle = styled.button<{ $busy: boolean; $watched: boolean }>`
  align-items: center;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.pill};
  cursor: ${({ $busy }) => ($busy ? 'wait' : 'pointer')};
  display: inline-flex;
  font-family: ${({ theme }) => theme.fonts.fontSecondary};
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fonts.medium};
  gap: ${({ theme }) => theme.spacing.xs};
  line-height: 1;
  opacity: ${({ $busy }) => ($busy ? 0.6 : 1)};
  padding: ${({ theme }) => theme.spacing(0.75)} ${({ theme }) => theme.spacing(1.5)};
  white-space: nowrap;

  ${({ $watched, theme }) =>
    $watched
      ? css`
          background: ${theme.colors.success.light};
          color: ${theme.colors.success.dark};

          &:hover:not(:disabled) {
            background: ${theme.colors.success.main};
            color: ${theme.colors.success.contrastText};
          }
        `
      : css`
          background: ${theme.colors.neutral.level10};
          border-color: ${theme.colors.neutral.level8};
          color: ${theme.colors.neutral.level4};

          &:hover:not(:disabled) {
            background: ${theme.colors.primary.light};
            border-color: ${theme.colors.primary.main};
            color: ${theme.colors.primary.dark};
          }
        `}
`;
