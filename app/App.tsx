import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import router from './router'
import StoreProvider from './StoreProvider'
import { GlobalStyle, ThemeProvider, theme } from './theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StoreProvider>
        <RouterProvider router={router} />
        <Toaster position='bottom-center' />
      </StoreProvider>
    </ThemeProvider>
  )
}
