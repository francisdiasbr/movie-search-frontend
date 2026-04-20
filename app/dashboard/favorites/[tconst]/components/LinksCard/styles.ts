import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  overflow: hidden;
`;

export const CardBody = styled.div`
  padding: 20px;
`;

export const CardHeader = styled.div`
  background: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 20px;
`;

export const CardTitle = styled.h3`
  color: #2d3748;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

export const LinkItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LinkLabel = styled.span`
  color: #718096;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const LinkValue = styled.div`
  color: #2d3748;
  font-size: 14px;
  word-break: break-word;
`;

export const LinksGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
