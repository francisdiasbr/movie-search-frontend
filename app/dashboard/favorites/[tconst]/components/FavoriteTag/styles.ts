import styled from 'styled-components';

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Tag = styled.span<{ $isExisting: boolean; $isSelected: boolean }>`
  align-items: center;
  background: ${({ $isExisting, theme }) => ($isExisting ? theme.colors.secondary.light : theme.colors.primary.light)};
  border: 2px solid ${({ $isSelected, theme }) => ($isSelected ? theme.colors.primary.main : theme.colors.neutral.transparent)};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ $isExisting, theme }) => ($isExisting ? theme.colors.secondary.contrastText : theme.colors.primary.dark)};
  cursor: pointer;
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: ${({ $isSelected, theme }) => ($isSelected ? theme.fonts.bold : theme.fonts.regular)};
  gap: ${({ theme }) => theme.spacing.xxs};
  padding: 2px ${({ theme }) => theme.spacing.sm};
`;
