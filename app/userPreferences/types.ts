// 'en' is what IMDB gives; 'pt' is translated by the backend on demand.
export type Language = 'en' | 'pt';

export interface UserPreferencesState {
  language: Language;
}
