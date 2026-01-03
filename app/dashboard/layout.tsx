'use client';

import SideNav from '../ui/Dashboard/SideNav';
import Topbar from '../ui/Dashboard/Topbar';
import * as S from './styles';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />
      <S.LayoutContainer>
        <S.SideNavWrapper>
          <SideNav />
        </S.SideNavWrapper>
        <S.ContentWrapper>{children}</S.ContentWrapper>
      </S.LayoutContainer>
    </>
  );
}
