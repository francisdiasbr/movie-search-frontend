import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  overflow: hidden;
  width: 100%;
  
  @media (min-width: 1024px) {
    width: calc(50% - 12px);
  }
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

export const Content = styled.ul`
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #2d3748;
`;
