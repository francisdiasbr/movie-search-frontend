'use client';

import { BookmarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

import * as S from './styles';

const links = [
  { href: '/dashboard/search', icon: PlusIcon, name: 'Adicionar na coleção' },
  { href: '/dashboard/favorites', icon: BookmarkIcon, name: 'Minha coleção' },
  { href: '/dashboard/keywords', icon: BookmarkIcon, name: 'Palavras-chave favoritadas' },
];

export default function SideNav() {
  const pathname = usePathname();
  
  return (
    <S.Container>
      <S.NavContainer>
        {links.map(link => {
          const LinkIcon = link.icon;
          const isActive = pathname === link.href;
          return (
            <S.StyledLink href={link.href} key={link.name} isActive={isActive}>
              <S.LinkIconWrapper>
                <LinkIcon />
              </S.LinkIconWrapper>
              <S.LinkText>{link.name}</S.LinkText>
            </S.StyledLink>
          );
        })}
      </S.NavContainer>
    </S.Container>
  );
}
