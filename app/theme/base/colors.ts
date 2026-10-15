// Contract only: concrete values live in movieSearch/colors.ts (same split as @gav/theme).
export type Color =
  | 'background.page' | 'background.surface'
  | 'error.contrastText' | 'error.dark' | 'error.light' | 'error.main'
  | 'info.contrastText' | 'info.dark' | 'info.light' | 'info.main'
  | 'primary.contrastText' | 'primary.dark' | 'primary.light' | 'primary.main'
  | 'secondary.contrastText' | 'secondary.dark' | 'secondary.light' | 'secondary.main'
  | 'success.contrastText' | 'success.dark' | 'success.light' | 'success.main'
  | 'neutral.black' | 'neutral.level1' | 'neutral.level2' | 'neutral.level3' | 'neutral.level4'
  | 'neutral.level5' | 'neutral.level6' | 'neutral.level7' | 'neutral.level8' | 'neutral.level9'
  | 'neutral.level10' | 'neutral.level11' | 'neutral.white' | 'neutral.transparent';

export interface ColorsDefault {
  contrastText: string;
  dark: string;
  light: string;
  main: string;
}

export interface BackgroundColors {
  page: string;
  surface: string;
}

export interface NeutralColors {
  black: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
  level6: string;
  level7: string;
  level8: string;
  level9: string;
  level10: string;
  level11: string;
  white: string;
  transparent: string;
}

export interface Colors {
  background: BackgroundColors;
  error: ColorsDefault;
  info: ColorsDefault;
  neutral: NeutralColors;
  primary: ColorsDefault;
  secondary: ColorsDefault;
  success: ColorsDefault;
}
