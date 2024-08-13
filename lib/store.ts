import { configureStore } from '@reduxjs/toolkit'
import movieCuratorySlice from './features/movies/curatorySlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      moviesCuratory: movieCuratorySlice,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']