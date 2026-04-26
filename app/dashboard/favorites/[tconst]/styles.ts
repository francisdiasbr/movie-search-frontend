import styled from 'styled-components';

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

export const PageContainer = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const SectionContainer = styled.div<{ isHorizontal?: boolean }>`
  align-items: ${props => props.isHorizontal ? 'center' : 'flex-start'};
  display: flex;
  flex-direction: ${props => props.isHorizontal ? 'row' : 'column'};
  gap: ${props => props.isHorizontal ? '8px' : '0'};
  width: 100%;
`;

export const SectionContent = styled.div`
  color: #2d3748;
  flex: 1;
  font-size: 14px;
  word-break: break-word;
`;

export const SectionTitle = styled.h3`
  color: #718096;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  min-width: fit-content;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const SectionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 1024px) {
    align-items: start;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;
