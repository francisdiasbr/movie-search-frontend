export type FontFamily = 'fontPrimary' | 'fontSecondary';
export type WeightTypes = 'thin' | 'light' | 'regular' | 'medium' | 'bold';

export interface Fonts {
  fontPrimary: string;
  fontSecondary: string;
  thin: number;
  light: number;
  regular: number;
  medium: number;
  bold: number;
}
