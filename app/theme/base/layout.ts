export type SpacingStep = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type RadiusStep = 'sm' | 'md' | 'lg' | 'pill';
export type ShadowStep = 'sm' | 'md' | 'lg';
export type Breakpoint = 'sm' | 'md' | 'lg';

export interface Spacing extends Record<SpacingStep, string> {
  /** Multiples of the 8px base unit, like MUI's `theme.spacing(n)`. */
  (multiplier: number): string;
  unit: number;
}

export interface Layout {
  breakpoints: Record<Breakpoint, string>;
  radius: Record<RadiusStep, string>;
  shadows: Record<ShadowStep, string>;
  spacing: Spacing;
  zIndex: {
    nav: number;
    dialog: number;
    toast: number;
  };
}
