import styled from 'styled-components';

export const PaginationContainer = styled.div`
  align-items: center;  
  background-color: #f9fafb;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 8px;
  width: 100%;
`;

export const PaginationButtons = styled.div`
  align-items: center;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 0 16px;
  width: auto;
`;

export const Button = styled.button`
  font-weight: 600;
`;

export const PageValue = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 0 8px;
`;

export const SelectContainer = styled.select`
  align-items: center;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  margin: 10px;
`;

export const TotalDocs = styled.div`
  font-size: 14px;
  min-width: 100px;
`;