import { NavLink, Outlet } from 'react-router-dom'

import { ROUTES } from '../const'
import LanguageSelector from './components/LanguageSelector'
import * as S from './styles'

const links = [
  { href: ROUTES.favorites, name: 'Minha coleção' },
  { href: ROUTES.series, name: 'Séries' },
  { href: ROUTES.keywords, name: 'Palavras-chave favoritadas' },
  { href: ROUTES.write, name: 'Escrever' },
  { href: ROUTES.read, name: 'Ler' },
  { href: ROUTES.belasArtes, name: 'Belas Artes' },
]

export default function Layout() {
  return (
    <S.LayoutContainer>
      <S.Nav>
        <S.NavList>
          {links.map(link => (
            <li key={link.name}>
              <NavLink to={link.href}>{link.name}</NavLink>
            </li>
          ))}
        </S.NavList>
        <LanguageSelector />
      </S.Nav>
      <S.ContentWrapper as='main'>
        <Outlet />
      </S.ContentWrapper>
    </S.LayoutContainer>
  )
}
