'use client';

import { Text } from '@chakra-ui/react';

import * as S from './styles';

const Topbar = () => {
  return (
    <S.TopBarContainer>
      <Text fontSize='4xl' as='b'>The Movie Search</Text>
    </S.TopBarContainer>
  );
}

export default Topbar;