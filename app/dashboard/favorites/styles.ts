import styled from 'styled-components';

export const Poster = styled.img`
  display: block;
  height: 80px;
  margin: 0 auto;
  width: 54px;
`;

export const LinkButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.main};
  cursor: pointer;
  padding: 0;
  text-decoration: underline;

  &:hover {
    background: none;
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`;
