import styled from 'styled-components';

// ── Page header ───────────────────────────────────────────────────────────────

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const PageHeader = styled.header`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: space-between;
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  h1 {
    margin: 0;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

// ── Review blocks (pt / en) ───────────────────────────────────────────────────

export const LanguageGrid = styled.div`
  align-items: stretch;
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ReviewText = styled.p`
  color: ${({ theme }) => theme.colors.neutral.level2};
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  white-space: pre-line;
`;

export const ReviewTextarea = styled.textarea`
  font-size: 1rem;
  line-height: 1.6;
  min-height: 320px;
  resize: vertical;
  width: 100%;
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.neutral.level5};
  font-style: italic;
  margin: 0;
`;

// ── Images ────────────────────────────────────────────────────────────────────

export const ImagesGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ImageWrapper = styled.figure`
  background: ${({ theme }) => theme.colors.neutral.level11};
  border: 1px solid ${({ theme }) => theme.colors.neutral.level9};
  border-radius: ${({ theme }) => theme.radius.md};
  margin: 0;
  overflow: hidden;
  position: relative;
`;

export const ReviewImage = styled.img`
  aspect-ratio: 3 / 2;
  display: block;
  object-fit: cover;
  width: 100%;
`;

export const ImageCaption = styled.figcaption`
  color: ${({ theme }) => theme.colors.neutral.level3};
  font-size: 0.875rem;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing(1.5)};
`;

export const ImageActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: ${({ theme }) => theme.spacing.sm};

  button {
    align-items: center;
    background: ${({ theme }) => theme.colors.background.surface};
    border: 1px solid ${({ theme }) => theme.colors.neutral.level8};
    border-radius: ${({ theme }) => theme.radius.sm};
    color: ${({ theme }) => theme.colors.primary.main};
    display: inline-flex;
    padding: ${({ theme }) => theme.spacing.xs};

    &:hover {
      background: ${({ theme }) => theme.colors.primary.light};
    }
  }
`;

export const CaptionForm = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.level9};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing(1.5)};

  input {
    flex: 1 1 160px;
  }
`;
