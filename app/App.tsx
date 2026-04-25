import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import StoreProvider from './StoreProvider'
import router from './router'

export default function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
      <Toaster position='bottom-center' />
    </StoreProvider>
  )
}
