import styled from 'styled-components';

export const Card = styled.li`
  background: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid ${({ theme }) => theme.colors.neutral.level8};
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  list-style: none;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const Collected = styled.span`
  color: ${({ theme }) => theme.colors.primary.main};
  display: inline-flex;
  padding: ${({ theme }) => theme.spacing.xs};
`;

export const Description = styled.em`
  display: block;
  line-height: 1.5;
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

export const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Relevance = styled.div`
  color: ${({ theme }) => theme.colors.neutral.level4};
  font-size: 0.9em;
  line-height: 1.5;
`;

export const Title = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;
