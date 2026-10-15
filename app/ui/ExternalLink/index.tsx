import { AnchorHTMLAttributes } from 'react';

import * as S from './styles';

// Opens in a new tab with the safe rel; shows the href when there is no text.
const ExternalLink = ({ children, href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <S.Anchor href={href} rel='noopener noreferrer' target='_blank' {...rest}>
    {children ?? href}
  </S.Anchor>
);

export default ExternalLink;
