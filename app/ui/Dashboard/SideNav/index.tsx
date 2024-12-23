// 'use client';

import NavLinks from '../NavLinks/nav-links';
import * as S from './styles';

export default function SideNav() {
  return (
    <S.Container>
      <S.NavContainer>
        <NavLinks />
      </S.NavContainer>
    </S.Container>
  );
}
