import { Link } from 'react-router-dom';
import styled from 'styled-components';

import IconButton from '../../ui/IconButton';

export const Actions = styled.div`
  align-items: center;
  display: inline-flex;
  gap: ${({ theme }) => theme.spacing.xs};
  justify-content: center;
`;

// Transparent until hovered, when it turns red to announce the removal.
export const DangerIconButton = styled(IconButton)`
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.error.main};
    color: ${({ theme }) => theme.colors.error.contrastText};
  }
`;

export const Poster = styled.img`
  border-radius: ${({ theme }) => theme.radius.sm};
  display: block;
  height: 80px;
  margin: 0 auto;
  width: 54px;
`;

// Inside the list the link only shows it is one on hover.
export const TitleLink = styled(Link)`
  font-weight: ${({ theme }) => theme.fonts.medium};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
