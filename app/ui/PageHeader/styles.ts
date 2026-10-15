import styled from 'styled-components';

export const Header = styled.header`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  h1 {
    margin: 0;
  }
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.neutral.level4};
  font-size: 1rem;
  margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;
