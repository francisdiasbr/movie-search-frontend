export const imdbTitleUrl = (tconst: string): string => `https://www.imdb.com/title/${tconst}/`;

// IMDb title search. Used when we only trust the title and year, not the id.
export const imdbSearchUrl = (title: string, year?: number | string): string =>
  `https://www.imdb.com/find/?s=tt&q=${encodeURIComponent([title, year].filter(Boolean).join(' '))}`;

export const pirateBaySearchUrl = (title: string): string =>
  `https://thepiratebay.party/search/${encodeURIComponent(title)}/0/99/0`;

// Turns a Spotify share link (album, playlist, track...) into its embed URL.
export const spotifyEmbedUrl = (url?: string | null): string | null => {
  if (!url) return null;
  const parts = url.replace(/\/+$/, '').split('/');
  const type = parts[parts.length - 2];
  const id = parts[parts.length - 1];
  if (!type || !id) return null;
  return `https://open.spotify.com/embed/${type}/${id}`;
};
