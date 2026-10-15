import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import StoreProvider from './StoreProvider'
import router from './router'
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
