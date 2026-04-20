'use client';

import * as S from './styles';

const links = [
  { href: '/dashboard/search', name: 'Adicionar na coleção' },
  { href: '/dashboard/favorites', name: 'Minha coleção' },
  { href: '/dashboard/keywords', name: 'Palavras-chave favoritadas' },
];


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <S.LayoutContainer>
        <table>
          <tbody>
            <tr>
              {links.map(link => (
                <td key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <S.ContentWrapper>{children}</S.ContentWrapper>
      </S.LayoutContainer>
  );
}
