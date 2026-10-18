import { Language } from '../types';

const LANGUAGE_KEY = 'movie-search:language';

// There is no user account, so the preferences live in localStorage. Plays
// the role of siga-front's UserPreferencesService, which saves them on the
// backend.
class UserPreferencesStorage {
  getLanguage(): Language {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved === 'en' || saved === 'pt') return saved;
    return /^pt\b/.test(navigator.language) ? 'pt' : 'en';
  }

  saveLanguage(language: Language): void {
    localStorage.setItem(LANGUAGE_KEY, language);
  }
}

export default new UserPreferencesStorage();
