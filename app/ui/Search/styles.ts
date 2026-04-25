import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 16px;

@media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const SearchInput = styled.input``;
