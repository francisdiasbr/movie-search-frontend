import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  overflow: hidden;
`;

export const CardHeader = styled.div`
  background: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 20px;
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

export const CardBody = styled.div`
  padding: 20px;
`;

export const LinksGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LinkItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LinkLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const LinkValue = styled.div`
  font-size: 14px;
  color: #2d3748;
  word-break: break-word;
`;
