import { useSelector, TypedUseSelectorHook } from 'react-redux'

import { AppState } from './index'

export const useGlobalState: TypedUseSelectorHook<AppState> = useSelector