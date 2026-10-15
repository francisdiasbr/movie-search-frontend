// Backend error messages that reach the user, translated to pt-BR.
const MESSAGES: Record<string, string> = {
  'Movie not found in favorites': 'Filme não encontrado nos favoritos',
};

export default (message?: string | null, fallback = 'Ocorreu um erro inesperado.'): string =>
  (message && MESSAGES[message]) || message || fallback;
