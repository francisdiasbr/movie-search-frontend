'use client';

import { Avatar, Text } from '@chakra-ui/react';

import * as S from './styles';

const Topbar = () => {
  return (
    <S.TopBarContainer>
    <Text fontSize='2xl'>Movie Search</Text>
    <Avatar bg='secondary.200'/>
    </S.TopBarContainer>
  );
}

export default Topbar;