import type { AppDispatch } from '../../../lib/store';
import { setLanguage } from '../reducer/userPreferencesSlice';
import userPreferencesStorage from '../service/UserPreferencesStorage';
import { Language } from '../types';

// Persists the choice and updates the store, like siga-front's dispatchLanguage.
export const dispatchLanguage = (language: Language) => (dispatch: AppDispatch) => {
  userPreferencesStorage.saveLanguage(language);
  dispatch(setLanguage(language));
};
