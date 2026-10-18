import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { LanguageProvider } from './language/LanguageProvider'
import router from './router'
import StoreProvider from './StoreProvider'
import { GlobalStyle, ThemeProvider, theme } from './theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StoreProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
          <Toaster position='bottom-center' />
        </LanguageProvider>
      </StoreProvider>
    </ThemeProvider>
  )
}
