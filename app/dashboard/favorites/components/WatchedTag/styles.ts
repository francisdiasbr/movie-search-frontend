import styled from 'styled-components';

export const Toggle = styled.span<{ $busy: boolean }>`
  cursor: ${({ $busy }) => ($busy ? 'not-allowed' : 'pointer')};
  opacity: ${({ $busy }) => ($busy ? 0.6 : 1)};
  text-decoration: underline dotted;
`;
