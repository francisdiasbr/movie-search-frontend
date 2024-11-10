'use client';

import { Text } from '@chakra-ui/react';

import * as S from './styles';

const Topbar = () => {
  return (
    <S.TopBarContainer>
      <Text fontSize='2xl'>Movie Search</Text>
    </S.TopBarContainer>
  );
}

export default Topbar;