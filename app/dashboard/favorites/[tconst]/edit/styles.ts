import styled from 'styled-components';

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  border: none;
  border-radius: 20px;
  background: none;
  padding: 8px;

  &:hover {
    background-color: #d7d7d7;
  }
`;

export const PageContainer = styled.div`
  align-items: start;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
`;
