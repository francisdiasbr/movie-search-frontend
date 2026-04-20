import styled from 'styled-components';

export const BackButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  margin-bottom: 20px;
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
