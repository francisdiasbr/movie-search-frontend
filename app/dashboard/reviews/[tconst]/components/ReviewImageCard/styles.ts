import styled from 'styled-components';

export const Figure = styled.figure`
  background: ${({ theme }) => theme.colors.neutral.level11};
  border: 1px solid ${({ theme }) => theme.colors.neutral.level9};
  border-radius: ${({ theme }) => theme.radius.md};
  margin: 0;
  overflow: hidden;
  position: relative;
`;

export const Image = styled.img`
  aspect-ratio: 3 / 2;
  display: block;
  object-fit: cover;
  width: 100%;
`;

export const Caption = styled.figcaption`
  color: ${({ theme }) => theme.colors.neutral.level3};
  font-size: 0.875rem;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing(1.5)};
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: ${({ theme }) => theme.spacing.sm};

  button {
    background: ${({ theme }) => theme.colors.background.surface};
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
