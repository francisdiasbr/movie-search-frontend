import styled, { css } from 'styled-components';

import type { SpacingStep } from '../../theme';

interface FlexProps {
  $align?: 'center' | 'flex-end' | 'flex-start' | 'stretch';
  $gap?: SpacingStep;
  $justify?: 'center' | 'flex-end' | 'flex-start' | 'space-between';
  $mt?: SpacingStep;
  $wrap?: boolean;
}

const flex = css<FlexProps>`
  align-items: ${({ $align = 'stretch' }) => $align};
  display: flex;
  gap: ${({ $gap = 'md', theme }) => theme.spacing[$gap]};
  justify-content: ${({ $justify = 'flex-start' }) => $justify};
  margin-top: ${({ $mt, theme }) => ($mt ? theme.spacing[$mt] : 0)};
`;

// Vertical list of blocks.
export const Stack = styled.div<FlexProps>`
  ${flex}
  flex-direction: column;
`;

// Horizontal line of controls (inputs + buttons). Wraps on small screens.
export const Row = styled.div<FlexProps>`
  ${flex}
  align-items: ${({ $align = 'center' }) => $align};
  flex-direction: row;
  flex-wrap: ${({ $wrap = true }) => ($wrap ? 'wrap' : 'nowrap')};
  gap: ${({ $gap = 'sm', theme }) => theme.spacing[$gap]};
`;
