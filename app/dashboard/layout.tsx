import { Link, Outlet } from 'react-router-dom'
import * as S from './styles'

const links = [
  { href: '/dashboard/search', name: 'Adicionar na coleção' },
  { href: '/dashboard/favorites', name: 'Minha coleção' },
  { href: '/dashboard/keywords', name: 'Palavras-chave favoritadas' },
  { href: '/dashboard/write', name: 'Escrever' },
  { href: '/dashboard/read', name: 'Ler' },
]

export default function Layout() {
  return (
    <S.LayoutContainer>
      <S.Nav>
        <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', margin: 0, padding: 0 }}>
          {links.map(link => (
            <li key={link.name}>
              <Link to={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </S.Nav>
      <S.ContentWrapper>
        <Outlet />
      </S.ContentWrapper>
    </S.LayoutContainer>
  )
}
