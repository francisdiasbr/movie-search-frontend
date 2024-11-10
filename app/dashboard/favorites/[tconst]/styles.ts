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

export const Container = styled.div`
  align-items: start;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 90%;
`;

export const LineInfo = styled.div`
  font-size: 16px;
`;

export const PageTitle = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const PageContainer = styled.div`
  align-items: start;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  width: 100%;
  margin-bottom: 20px;

  @media (min-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1536px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;