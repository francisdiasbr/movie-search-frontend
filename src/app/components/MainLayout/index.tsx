import React from 'react';
import { ScrollView } from 'react-native';

import * as S from './styles';

const MainLayout = ({ children }: any) => {
  return (
    <ScrollView>
      <S.Container>
        {children}
      </S.Container>
    </ScrollView>
  )
}

export default MainLayout;