'use client';

import * as S from './styles';

const links = [
  { href: '/dashboard/search', name: 'Adicionar na coleção' },
  { href: '/dashboard/favorites', name: 'Minha coleção' },
  { href: '/dashboard/keywords', name: 'Palavras-chave favoritadas' },
  { href: '/dashboard/write', name: 'Escrever' },
  { href: '/dashboard/read', name: 'Ler' },
];


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <S.LayoutContainer>
        <nav>
          <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', margin: 0, padding: 0 }}>
            {links.map(link => (
              <li key={link.name}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <S.ContentWrapper>{children}</S.ContentWrapper>
      </S.LayoutContainer>
  );
}
