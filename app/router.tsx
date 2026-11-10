import { createBrowserRouter, Navigate } from 'react-router-dom'

import { ROUTES } from './const'
import BelasArtesPage from './dashboard/belas-artes/page'
import FavoriteDetailPage from './dashboard/favorites/[tconst]/page'
import FavoritesPage from './dashboard/favorites/page'
import KeywordsPage from './dashboard/keywords/page'
import DashboardLayout from './dashboard/layout'
import ReadPage from './dashboard/read/page'
import ReviewPage from './dashboard/reviews/[tconst]/page'
import SeriesPage from './dashboard/series/page'
import WriteReviewPage from './dashboard/write-review/page'
import WritePage from './dashboard/write/page'

export default createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={ROUTES.favorites} replace />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'favorites/:tconst', element: <FavoriteDetailPage /> },
      { path: 'reviews/:tconst', element: <ReviewPage /> },
      { path: 'keywords', element: <KeywordsPage /> },
      { path: 'read', element: <ReadPage /> },
      { path: 'belas-artes', element: <BelasArtesPage /> },
      { path: 'series', element: <SeriesPage /> },
      { path: 'write', element: <WritePage /> },
      { path: 'write-review', element: <WriteReviewPage /> },
    ],
  },
])
