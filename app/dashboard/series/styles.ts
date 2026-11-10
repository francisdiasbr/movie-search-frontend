import styled from 'styled-components';

import IconButton from '../../ui/IconButton';

export const Actions = styled.div`
  align-items: center;
  display: inline-flex;
  justify-content: center;
`;

// Transparent until hovered, when it turns red to announce the removal.
export const DangerIconButton = styled(IconButton)`
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.error.main};
    color: ${({ theme }) => theme.colors.error.contrastText};
  }
`;

export const Genres = styled.span`
  color: ${({ theme }) => theme.colors.neutral.level5};
  font-size: 0.8rem;
`;

export const Poster = styled.img`
  border-radius: ${({ theme }) => theme.radius.sm};
  display: block;
  height: 80px;
  margin: 0 auto;
  object-fit: cover;
  width: 54px;
`;

export const Rating = styled.a`
  font-weight: ${({ theme }) => theme.fonts.medium};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const SearchBar = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  input {
    min-height: 36px;
    width: 100%;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: 320px;
    }
  }
`;

// Original title, Brazilian title under it, genres under both.
export const TitleCell = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxs};
  text-align: left;
`;

export const TitleLink = styled.a`
  font-weight: ${({ theme }) => theme.fonts.medium};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const TitlePt = styled.span`
  color: ${({ theme }) => theme.colors.neutral.level3};
  font-size: 0.9rem;
`;
