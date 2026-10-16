import styled from 'styled-components';

export const Relevance = styled.div`
  color: ${({ theme }) => theme.colors.neutral.level4};
  font-size: 0.9em;
`;

export const Results = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;

export const Genre = styled.span`
  background: ${({ theme }) => theme.colors.primary.light};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.primary.dark};
  font-family: ${({ theme }) => theme.fonts.fontSecondary};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fonts.medium};
  padding: 2px ${({ theme }) => theme.spacing.sm};
`;
