'use client';

import {
  BookmarkIcon,
  FilmIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import * as S from './styles';

const links = [
  { href: '/dashboard', icon: HomeIcon, name: 'Home' },
  { href: '/dashboard/search', icon: MagnifyingGlassIcon, name: 'Search Movies' },
  { href: '/dashboard/favorites', icon: BookmarkIcon, name: 'Favorites' },
  { href: '/dashboard/write-review', icon: FilmIcon, name: 'Write' },
  { href: '/dashboard/generate-review', icon: FilmIcon, name: 'Generate review' },
  { href: '/dashboard/reviews', icon: FilmIcon, name: 'Reviews' }
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
