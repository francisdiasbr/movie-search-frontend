import React from 'react';

import { TextStyled } from './styles';
import { TypographyProps } from './types';

const Typography: React.FC<TypographyProps> = ({
  children,
  color = '#2D2A26',
  underline,
  variant = 'text-md',
  style,
}) => {
  return (
    <TextStyled
      underline={underline}
      variant={variant}
      color={color}
      style={style}
    >
      {children}
    </TextStyled>
  );
};

export default Typography;
