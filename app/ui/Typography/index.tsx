import React from 'react';

import { TextStyled } from './styles';
import { TypographyProps } from './types';

const Typography: React.FC<TypographyProps> = ({
  children,
  color = '#2D2A26',
  style,
  underline,
  variant = 'text-md',
}) => {
  return (
    <TextStyled
      color={color}
      style={style}
      underline={underline}
      variant={variant}
    >
      {children}
    </TextStyled>
  );
};

export default Typography;
