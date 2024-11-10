import styled from 'styled-components';

export const PaginationContainer = styled.div`
  background-color: #f9fafb;
  border-radius: 8px;
  // height: 50px;
  padding: 8px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const PaginationButtons = styled.div`
  align-items: center;
  border-radius: 5px;
  flex-direction: row;
  display: flex;
  gap: 8px;
  padding: 0 16px;
  width: auto;
`;

export const Button = styled.button`
  font-weight: 600;
`;

export const PageValue = styled.div`
  border-radius: 5px;
  padding: 0 8px;
  border: 1px solid black;
`;

export const SelectContainer = styled.select`
  display: flex;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

export const TotalDocs = styled.div`
  font-size: 14px;
  width: 160px;
`;