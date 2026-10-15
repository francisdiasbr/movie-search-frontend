import Button, { ButtonProps } from '../Button';

interface IconButtonProps extends Omit<ButtonProps, 'children' | 'iconLeft' | 'iconRight'> {
  icon: NonNullable<ButtonProps['iconLeft']>;
  // Tooltip and accessible name.
  title: string;
}

// Square button with only an icon. Transparent by default so it sits well
// inside cards and table cells.
const IconButton = ({ icon, size = 'small', title, variant = 'transparent', ...rest }: IconButtonProps) => (
  <Button aria-label={title} iconLeft={icon} size={size} title={title} variant={variant} {...rest} />
);

export default IconButton;
