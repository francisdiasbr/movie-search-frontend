import styled from 'styled-components';

// ── Card shell — shared by all cards ─────────────────────────────────────────

export const Card = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

// ── Generic content wrapper — shared ─────────────────────────────────────────

export const Content = styled.div`
  color: #2d3748;
  font-size: 14px;
  line-height: 1.5;
`;

// ── MainImageUpload ───────────────────────────────────────────────────────────

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

export const ImageContainer = styled.div`
  aspect-ratio: 3/2;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
`;

export const ImageOverlay = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 10;
`;

export const ImagesGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin-bottom: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// ── LinksCard ─────────────────────────────────────────────────────────────────

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

// ── MovieInfoCard ─────────────────────────────────────────────────────────────

export const ActionsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
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

export const SynopsisSection = styled.div`
  margin-bottom: 20px;
`;

export const SynopsisText = styled.div`
  color: #4a5568;
  font-size: 14px;
  line-height: 1.5;
  margin-top: 8px;
`;

// ── Page layout ───────────────────────────────────────────────────────────────

export const CardsContainer = styled.div`
  width: 100%;
`;

export const PageContainer = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const SectionContainer = styled.div<{ isHorizontal?: boolean }>`
  align-items: ${props => (props.isHorizontal ? 'center' : 'flex-start')};
  display: flex;
  flex-direction: ${props => (props.isHorizontal ? 'row' : 'column')};
  gap: ${props => (props.isHorizontal ? '8px' : '0')};
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
