type TypographyVariant =
  | 'heading-2xl'
  | 'heading-lg'
  | 'heading-md'
  | 'heading-sm'
  | 'heading-xl'
  | 'heading-xs'
  | 'text-2xl'
  | 'text-lg'
  | 'text-md'
  | 'text-sm'
  | 'text-xl'
  | 'text-xs';

export type TypographyProps = {
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
  underline?: boolean;
  variant?: TypographyVariant;
};
