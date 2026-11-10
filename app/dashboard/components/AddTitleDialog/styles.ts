import styled from 'styled-components';

export const Hint = styled.span`
  color: ${({ theme }) => theme.colors.neutral.level5};
  font-size: 0.8rem;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;
