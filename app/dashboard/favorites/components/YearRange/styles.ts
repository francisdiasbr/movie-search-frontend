import styled, { css } from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex: none;
  gap: ${({ theme }) => theme.spacing.sm};
  height: ${({ theme }) => theme.spacing.xl};
  max-width: 320px;
  width: 100%;
`;

export const Fill = styled.div<{ $left: number; $right: number }>`
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.radius.pill};
  height: 100%;
  left: ${({ $left }) => $left}%;
  position: absolute;
  right: ${({ $right }) => $right}%;
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.neutral.level4};
  font-size: 0.875rem;
  min-width: ${({ theme }) => theme.spacing(5)};
  text-align: center;
`;

const thumb = css`
  appearance: none;
  background: ${({ theme }) => theme.colors.background.surface};
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  cursor: pointer;
  height: ${({ theme }) => theme.spacing.md};
  pointer-events: auto;
  width: ${({ theme }) => theme.spacing.md};
`;

// Both inputs sit on top of the track; only their thumbs catch the pointer.
export const Thumb = styled.input`
  appearance: none;
  background: transparent;
  border: none;
  height: ${({ theme }) => theme.spacing.md};
  left: 0;
  margin: 0;
  padding: 0;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;

  &:focus {
    box-shadow: none;
    outline: none;
  }

  &::-webkit-slider-thumb {
    ${thumb}
  }

  &::-moz-range-thumb {
    ${thumb}
  }
`;

export const Track = styled.div`
  background: ${({ theme }) => theme.colors.neutral.level9};
  border-radius: ${({ theme }) => theme.radius.pill};
  flex: 1;
  height: ${({ theme }) => theme.spacing.xs};
  position: relative;
`;
