import LoadingSpinner from '../LoadingSpinner';
import * as S from './styles';
import type { ButtonProps } from './types';

export type { ButtonProps, ButtonSize, ButtonVariant } from './types';

const Button = ({
  children,
  disabled = false,
  fullWidth = false,
  href,
  iconLeft: IconLeft,
  iconRight: IconRight,
  loading = false,
  size = 'medium',
  type = 'button',
  variant = 'primary',
  ...rest
}: ButtonProps) => (
  <S.StyledButton
    $fullWidth={fullWidth}
    $iconOnly={!children}
    $loading={loading}
    $size={size}
    $variant={variant}
    disabled={disabled || loading}
    type={href ? undefined : type}
    {...(href ? { as: 'a', href, rel: 'noopener noreferrer', target: '_blank' } : {})}
    {...rest}
  >
    <S.Content $show={!loading}>
      {IconLeft && (
        <S.IconWrapper>
          <IconLeft />
        </S.IconWrapper>
      )}
      {children && <span>{children}</span>}
      {IconRight && (
        <S.IconWrapper>
          <IconRight />
        </S.IconWrapper>
      )}
    </S.Content>
    {loading && (
      <S.LoadingWrapper>
        <LoadingSpinner inline size='16px' thickness='2px' />
      </S.LoadingWrapper>
    )}
  </S.StyledButton>
);

export default Button;
