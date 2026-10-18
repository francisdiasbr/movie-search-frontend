// Matches an IMDb title id such as tt0084805.
export const TCONST_REGEX = /^tt\d{7,8}$/;

export const ROUTES = {
  favorite: (tconst: string) => `/dashboard/favorites/${tconst}`,
  favorites: '/dashboard/favorites',
  keywords: '/dashboard/keywords',
  read: '/dashboard/read',
  review: (tconst: string) => `/dashboard/reviews/${tconst}`,
  write: '/dashboard/write',
  writeReview: (params: { primaryTitle?: string; tconst: string }) => {
    const query = new URLSearchParams({ tconst: params.tconst });
    if (params.primaryTitle) query.set('primaryTitle', params.primaryTitle);
    return `/dashboard/write-review?${query.toString()}`;
  },
} as const;
