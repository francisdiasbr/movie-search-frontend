import { Link, Outlet } from 'react-router-dom'
import { ROUTES } from '../const'
import * as S from './styles'

const links = [
  { href: ROUTES.search, name: 'Adicionar na coleção' },
  { href: ROUTES.favorites, name: 'Minha coleção' },
  { href: ROUTES.keywords, name: 'Palavras-chave favoritadas' },
  { href: ROUTES.write, name: 'Escrever' },
  { href: ROUTES.read, name: 'Ler' },
]

export default function Layout() {
  return (
    <S.LayoutContainer>
      <S.Nav>
        <S.NavList>
          {links.map(link => (
            <li key={link.name}>
              <Link to={link.href}>{link.name}</Link>
            </li>
          ))}
        </S.NavList>
      </S.Nav>
      <S.ContentWrapper as='main'>
        <Outlet />
      </S.ContentWrapper>
    </S.LayoutContainer>
  )
}
