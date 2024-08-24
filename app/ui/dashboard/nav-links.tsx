'use client';

import {
  BookmarkIcon,
  FilmIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', icon: HomeIcon, name: 'Home' },
  {
    href: '/dashboard/search',
    icon: MagnifyingGlassIcon,
    name: 'Search Movies',
  },
  { href: '/dashboard/favorites', icon: BookmarkIcon, name: 'Favorites' },
  // { href: '/dashboard/mylists', icon: BookmarkIcon, name: 'My Lists' },
  // { href: '/dashboard/releases', icon: FilmIcon, name: 'Releases' },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              }
            )}
            href={link.href}
            key={link.name}
          >
            <LinkIcon className='w-6' />
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
