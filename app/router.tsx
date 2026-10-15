import { createBrowserRouter, Navigate } from 'react-router-dom'
import DashboardLayout from './dashboard/layout'
import FavoritesPage from './dashboard/favorites/page'
import FavoriteDetailPage from './dashboard/favorites/[tconst]/page'
import ReviewPage from './dashboard/reviews/[tconst]/page'
import SearchPage from './dashboard/search/page'
import KeywordsPage from './dashboard/keywords/page'
import ReadPage from './dashboard/read/page'
import WritePage from './dashboard/write/page'
import WriteReviewPage from './dashboard/write-review/page'
import { ROUTES } from './const'

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
      { path: 'search', element: <SearchPage /> },
      { path: 'keywords', element: <KeywordsPage /> },
      { path: 'read', element: <ReadPage /> },
      { path: 'write', element: <WritePage /> },
      { path: 'write-review', element: <WriteReviewPage /> },
    ],
  },
])
