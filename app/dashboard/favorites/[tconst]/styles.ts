import styled from 'styled-components';

// ── Page layout ───────────────────────────────────────────────────────────────

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

// ── Text inside cards ─────────────────────────────────────────────────────────

export const Content = styled.div`
  color: ${({ theme }) => theme.colors.neutral.level2};
  font-size: 14px;
  line-height: 1.5;
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.neutral.level5};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fonts.medium};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const Value = styled.div`
  color: ${({ theme }) => theme.colors.neutral.level2};
  font-size: 14px;
  word-break: break-word;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxs};
`;

export const BulletList = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing(2.5)};

  li {
    padding-bottom: ${({ theme }) => theme.spacing(1.25)};
  }
`;

export const NumberedList = styled(BulletList).attrs({ as: 'ol' })``;

// ── MovieInfoCard ─────────────────────────────────────────────────────────────

export const TitleLink = styled.span`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fonts.regular};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

export const Hero = styled.div`
  aspect-ratio: 21 / 9;
  max-height: 420px;
  position: relative;
  width: 100%;

  &::after {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0) 60%);
    content: '';
    inset: 0;
    position: absolute;
  }
`;

export const HeroImage = styled.img`
  height: 100%;
  inset: 0;
  object-fit: cover;
  position: absolute;
  width: 100%;
`;

export const HeroContent = styled.div`
  align-items: flex-end;
  bottom: 0;
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: space-between;
  left: 0;
  padding: ${({ theme }) => theme.spacing(2.5)};
  position: absolute;
  right: 0;
  z-index: 1;
`;

export const HeroTitle = styled.h2`
  align-items: baseline;
  color: ${({ theme }) => theme.colors.neutral.white};
  display: flex;
  flex-wrap: wrap;
  margin: 0;

  a {
    color: ${({ theme }) => theme.colors.neutral.white};
  }
`;

// Year · country · director under the title. Over the banner it is white;
// without a banner it sits at the top of the card body.
export const HeroMeta = styled.p`
  color: ${({ theme }) => theme.colors.neutral.level9};
  font-size: 0.9rem;
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
`;

// The Brazilian title, right under the original one.
export const HeroSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.neutral.white};
  font-family: ${({ theme }) => theme.fonts.fontPrimary};
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.fonts.medium};
  margin: ${({ theme }) => theme.spacing.xxs} 0 0;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.neutral.level3};
  font-family: ${({ theme }) => theme.fonts.fontPrimary};
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.fonts.medium};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

export const Meta = styled.p`
  color: ${({ theme }) => theme.colors.neutral.level4};
  font-size: 0.9rem;
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

export const Poster = styled.img`
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: block;
  max-width: 180px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 0 auto;
  }
`;

// Poster | info fields | synopsis | trivia; stacked on narrow screens.
export const InfoGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  grid-template-columns: 1fr;
  margin-bottom: ${({ theme }) => theme.spacing(2.5)};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: auto 1fr 1.5fr 2fr;
  }
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SynopsisText = styled.div`
  color: ${({ theme }) => theme.colors.neutral.level3};
  font-size: 14px;
  line-height: 1.5;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const ActionsSection = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

export const MagnetLink = styled.a`
  font-size: 12px;
  word-break: break-all;
`;

// ── Links card ────────────────────────────────────────────────────────────────

export const LinksGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

// ── Main images ───────────────────────────────────────────────────────────────

export const ImagesGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ImageContainer = styled.div`
  aspect-ratio: 3/2;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  position: relative;
`;

export const MainImage = styled.img`
  cursor: pointer;
  height: 100%;
  inset: 0;
  object-fit: cover;
  position: absolute;
  width: 100%;
`;

export const ImageOverlay = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: ${({ theme }) => theme.spacing.sm};
  z-index: 10;

  button {
    background: ${({ theme }) => theme.colors.background.surface};
  }
`;

export const PreviewImage = styled.img`
  border-radius: ${({ theme }) => theme.radius.md};
  max-height: 70vh;
  max-width: 100%;
  object-fit: contain;
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.neutral.level5};
  font-style: italic;
  margin: 0;
`;

// ── Quotes (formatQuote in utils.tsx) ─────────────────────────────────────────

// Laid out like a screenplay page: the character name in small caps above
// the line, the line indented, the whole dialogue in one bordered block.
export const QuoteBlock = styled.div`
  border-left: 3px solid ${({ theme }) => theme.colors.primary.light};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
  max-width: 720px;
  padding-left: ${({ theme }) => theme.spacing.md};
`;

export const QuoteLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxs};
`;

export const QuoteCharacter = styled.span`
  color: ${({ theme }) => theme.colors.primary.main};
  font-family: ${({ theme }) => theme.fonts.fontPrimary};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fonts.bold};
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const QuoteSpeech = styled.span`
  color: ${({ theme }) => theme.colors.neutral.level1};
  font-size: 15px;
  line-height: 1.5;
  padding-left: ${({ theme }) => theme.spacing.md};
`;

export const QuotePlain = styled.div`
  color: ${({ theme }) => theme.colors.neutral.level3};
  font-size: 15px;
  font-style: italic;
  line-height: 1.5;
`;
