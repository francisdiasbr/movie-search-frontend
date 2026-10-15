import styled from 'styled-components';

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Tag = styled.button<{ $favorited: boolean; $selected: boolean }>`
  align-items: center;
  background: ${({ $favorited, theme }) => ($favorited ? theme.colors.secondary.light : theme.colors.primary.light)};
  border: 2px solid ${({ $selected, theme }) => ($selected ? theme.colors.primary.main : theme.colors.neutral.transparent)};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ $favorited, theme }) => ($favorited ? theme.colors.secondary.contrastText : theme.colors.primary.dark)};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: ${({ $selected, theme }) => ($selected ? theme.fonts.bold : theme.fonts.regular)};
  gap: ${({ theme }) => theme.spacing.xxs};
  padding: 2px ${({ theme }) => theme.spacing.sm};

  &:hover {
    background: ${({ $favorited, theme }) => ($favorited ? theme.colors.secondary.main : theme.colors.secondary.light)};
  }
`;
