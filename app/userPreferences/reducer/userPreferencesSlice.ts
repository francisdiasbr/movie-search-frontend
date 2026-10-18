import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../../lib/store';
import userPreferencesStorage from '../service/UserPreferencesStorage';
import { Language, UserPreferencesState } from '../types';

const initialState: UserPreferencesState = {
  language: userPreferencesStorage.getLanguage(),
};

export const selectUserLanguage = (state: RootState) => state.userPreferences.language;

const userPreferencesSlice = createSlice({
  initialState,
  name: 'userPreferences',
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
