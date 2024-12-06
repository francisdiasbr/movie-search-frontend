'use client';

import {
  BookmarkIcon,
  FilmIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import * as S from './styles';

const links = [
  { href: '/dashboard', icon: HomeIcon, name: 'Home' },
  { href: '/dashboard/search', icon: MagnifyingGlassIcon, name: 'Pesquisar Filme' },
  // { href: '/dashboard/reviews', icon: MagnifyingGlassIcon, name: 'Search reviews' },
  { href: '/dashboard/favorites', icon: BookmarkIcon, name: 'Favoritos' },
  { href: '/dashboard/keywords', icon: BookmarkIcon, name: 'Movie Keywords' },
  // { href: '/dashboard/write-review', icon: FilmIcon, name: 'Write authoral review' },
  // { href: '/dashboard/generate-review', icon: SparklesIcon, name: 'Generate review' }
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
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
    </>
  );
}
