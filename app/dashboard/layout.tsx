'use client';

import SideNav from '../ui/Dashboard/SideNav';
import * as S from './styles';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <S.LayoutContainer>
        <S.SideNavWrapper>
          <SideNav />
        </S.SideNavWrapper>
        <S.ContentWrapper>{children}</S.ContentWrapper>
      </S.LayoutContainer>
  );
}
