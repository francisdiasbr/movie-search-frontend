import styled from 'styled-components';


export const PageContainer = styled.div`
  align-items: start;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
`;

export const SectionContainer = styled.div<{ isHorizontal?: boolean }>`
  display: flex;
  flex-direction: ${props => props.isHorizontal ? 'row' : 'column'};
  align-items: ${props => props.isHorizontal ? 'center' : 'flex-start'};
  gap: ${props => props.isHorizontal ? '8px' : '0'};
  width: 100%;
`;

export const SectionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;


export const CardsContainer = styled.div`
  width: 100%;
`;

export const CardsRow = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  min-width: fit-content;
  white-space: nowrap;
`;

export const SectionContent = styled.div`
  font-size: 14px;
  word-break: break-word;
  flex: 1;
  color: #2d3748;
`;

