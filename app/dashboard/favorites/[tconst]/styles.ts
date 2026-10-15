import styled from 'styled-components';

// ── Card shell — shared by all cards ─────────────────────────────────────────

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid ${({ theme }) => theme.colors.neutral.level9};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
  width: 100%;
`;

export const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing(2.5)};
`;

export const CardHeader = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.primary.light};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.level9};
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing(2.5)};
`;

export const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.neutral.level2};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.medium};
  margin: 0;
`;

// ── Generic content wrapper — shared ─────────────────────────────────────────

export const Content = styled.div`
  color: ${({ theme }) => theme.colors.neutral.level2};
  font-size: 14px;
  line-height: 1.5;
`;

// ── MainImageUpload ───────────────────────────────────────────────────────────

export const EmptyState = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(5)} ${({ theme }) => theme.spacing(2.5)};
  text-align: center;
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.neutral.level5};
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  max-width: 400px;
`;

export const ImageContainer = styled.div`
  aspect-ratio: 3/2;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  position: relative;
`;

export const ImageOverlay = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: ${({ theme }) => theme.spacing.sm};
  z-index: 10;
`;

export const ImagesGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// ── LinksCard ─────────────────────────────────────────────────────────────────

export const LinkItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const LinkLabel = styled.span`
  color: ${({ theme }) => theme.colors.neutral.level5};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fonts.medium};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const LinkValue = styled.div`
  color: ${({ theme }) => theme.colors.neutral.level2};
  font-size: 14px;
  word-break: break-word;
`;

export const LinksGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

// ── MovieInfoCard ─────────────────────────────────────────────────────────────

export const ActionsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

export const InfoGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  grid-template-columns: 1fr;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxs};
`;

export const InfoLabel = styled.span`
  color: ${({ theme }) => theme.colors.neutral.level5};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fonts.medium};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const InfoValue = styled.div`
  color: ${({ theme }) => theme.colors.neutral.level2};
  font-size: 14px;
  word-break: break-word;
`;

export const MovieTitle = styled.h2`
  color: ${({ theme }) => theme.colors.neutral.level2};
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fonts.medium};
  margin: 0;
`;

export const SynopsisSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2.5)};
`;

export const SynopsisText = styled.div`
  color: ${({ theme }) => theme.colors.neutral.level3};
  font-size: 14px;
  line-height: 1.5;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

// ── Page layout ───────────────────────────────────────────────────────────────

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

export const PageContainer = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

export const SectionContainer = styled.div<{ isHorizontal?: boolean }>`
  align-items: ${props => (props.isHorizontal ? 'center' : 'flex-start')};
  display: flex;
  flex-direction: ${props => (props.isHorizontal ? 'row' : 'column')};
  gap: ${({ isHorizontal, theme }) => (isHorizontal ? theme.spacing.sm : '0')};
  width: 100%;
`;

export const SectionContent = styled.div`
  color: ${({ theme }) => theme.colors.neutral.level2};
  flex: 1;
  font-size: 14px;
  word-break: break-word;
`;

export const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.neutral.level5};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fonts.medium};
  letter-spacing: 0.5px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  min-width: fit-content;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const SectionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    align-items: start;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

// ── Quotes (formatQuote in utils.tsx) ─────────────────────────────────────────

export const QuoteLine = styled.div`
  align-items: flex-start;
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const QuoteCharacter = styled.span`
  color: ${({ theme }) => theme.colors.primary.main};
  flex-shrink: 0;
  font-weight: ${({ theme }) => theme.fonts.medium};
  margin-right: ${({ theme }) => theme.spacing(0.75)};
`;

export const QuoteSpeech = styled.span`
  color: ${({ theme }) => theme.colors.neutral.level1};
  font-style: italic;
`;

export const QuotePlain = styled.div`
  color: ${({ theme }) => theme.colors.neutral.level3};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;
