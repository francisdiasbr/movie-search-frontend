import type { ButtonHTMLAttributes, ComponentType, ReactNode } from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'transparent' | 'danger' | 'success';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children?: ReactNode;
  fullWidth?: boolean;
  iconLeft?: ComponentType<{ size?: number | string }>;
  iconRight?: ComponentType<{ size?: number | string }>;
  loading?: boolean;
  size?: ButtonSize;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
}
