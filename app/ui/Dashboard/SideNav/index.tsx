// 'use client';

import { Text } from '@chakra-ui/react';

import NavLinks from '../NavLinks/nav-links';
import * as S from './styles'

export default function SideNav() {
  return (
    <S.Container>
      <S.LogoLink href='/dashboard'>
        <S.LogoContainer>
          <Text fontSize='2xl' as='b'>Movie Search</Text>
        </S.LogoContainer>
      </S.LogoLink>
      <S.NavContainer>
        <NavLinks />
      </S.NavContainer>
    </S.Container>
  );
}
