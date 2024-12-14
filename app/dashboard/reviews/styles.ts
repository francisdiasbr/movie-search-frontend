import styled from 'styled-components';

export const PageContainer = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;

  & > input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  & > button {
    padding: 0.5rem 1rem;
    background-color: #3182ce;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2b6cb0;
    }
  }
`;
