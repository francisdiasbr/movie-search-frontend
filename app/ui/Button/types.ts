import type { ButtonHTMLAttributes, ComponentType, ReactNode } from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'transparent' | 'danger' | 'success';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children?: ReactNode;
  fullWidth?: boolean;
  // Renders an <a> with the button look, opening in a new tab.
  href?: string;
  iconLeft?: ComponentType<{ size?: number | string }>;
  iconRight?: ComponentType<{ size?: number | string }>;
  loading?: boolean;
  size?: ButtonSize;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
}
