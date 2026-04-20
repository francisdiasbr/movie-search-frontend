import styled from 'styled-components';

export const ActionsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Card = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const CardBody = styled.div`
  padding: 20px;
`;

export const CardHeader = styled.div`
  align-items: center;
  background: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
`;

export const InfoGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoLabel = styled.span`
  color: #718096;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const InfoValue = styled.div`
  color: #2d3748;
  font-size: 14px;
  word-break: break-word;
`;

export const MovieTitle = styled.h2`
  color: #2d3748;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

export const StatusTag = styled.div`
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  padding: 4px 12px;
  text-transform: uppercase;
`;

export const SynopsisSection = styled.div`
  margin-bottom: 20px;
`;

export const SynopsisText = styled.div`
  color: #4a5568;
  font-size: 14px;
  line-height: 1.5;
  margin-top: 8px;
`;
