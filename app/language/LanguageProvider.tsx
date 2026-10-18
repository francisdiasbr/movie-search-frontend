import { createContext, ReactNode, useContext, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { dispatchLanguage } from '../userPreferences/action/userPreferencesAction';
import { selectUserLanguage } from '../userPreferences/reducer/userPreferencesSlice';
import { Language } from '../userPreferences/types';

interface LanguageContextValue {
  changeLanguage: (language: Language) => void;
  language: Language;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Reads the language from the user preferences in the store and exposes it to
// the tree, so screens and the selector never touch the slice directly.
// Mounted once in App, inside the StoreProvider.
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectUserLanguage);

  const value = useMemo<LanguageContextValue>(
    () => ({
      changeLanguage: next => {
        if (next !== language) dispatch(dispatchLanguage(next));
      },
      language,
    }),
    [dispatch, language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
};
