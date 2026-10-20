import styled from 'styled-components';

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.neutral.level3};
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;

  strong {
    color: ${({ theme }) => theme.colors.neutral.level1};
  }
`;
