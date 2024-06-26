import { useDispatch } from 'react-redux'

import { AppDispatch } from './index'

export const useAppDispatch: () => AppDispatch = useDispatch;