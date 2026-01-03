import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const CardHeader = styled.div`
  background: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MovieTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

export const StatusTag = styled.div`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const CardBody = styled.div`
  padding: 20px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
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
  font-size: 12px;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InfoValue = styled.div`
  font-size: 14px;
  color: #2d3748;
  word-break: break-word;
`;

export const SynopsisSection = styled.div`
  margin-bottom: 20px;
`;

export const SynopsisText = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #4a5568;
  margin-top: 8px;
`;

export const ActionsSection = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;
