import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  overflow: hidden;
  width: 100%;
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

export const CardTitle = styled.h3`
  color: #2d3748;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

export const ClearButton = styled.button`
  background: #e53e3e;
  border: 1px solid #e53e3e;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background: #c53030;
  }

  &:disabled {
    background: #a0aec0;
    border-color: #a0aec0;
    cursor: not-allowed;
  }
`;

export const EmptyState = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`;

export const EmptyText = styled.p`
  color: #718096;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  max-width: 400px;
`;

export const StickerContainer = styled.div`
  aspect-ratio: 3/2;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
  position: relative;
`;

export const StickerOverlay = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 10;
`;

export const StickersGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin-bottom: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
