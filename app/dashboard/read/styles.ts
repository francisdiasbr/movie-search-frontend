import styled from 'styled-components';

export const EntryCard = styled.div`
  background: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid ${({ theme }) => theme.colors.neutral.level9};
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
  padding: ${({ theme }) => theme.spacing.md};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;
