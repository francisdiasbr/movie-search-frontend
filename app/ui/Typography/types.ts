type TypographyVariant =
  | 'heading-xs'
  | 'heading-sm'
  | 'heading-md'
  | 'heading-lg'
  | 'heading-xl'
  | 'heading-2xl'
  | 'text-xs'
  | 'text-sm'
  | 'text-md'
  | 'text-lg'
  | 'text-xl'
  | 'text-2xl';

export type TypographyProps = {
  children: React.ReactNode;
  color?: string;
  underline?: boolean;
  variant?: TypographyVariant;
  style?: React.CSSProperties;
};
