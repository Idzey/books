import { createFileRoute } from '@tanstack/react-router'
import FavoritesPage from '../../pages/FavoritesPage'
import { z } from 'zod'

export const Route = createFileRoute('/favorites/')({
  validateSearch: z.object({
      q: z.string().optional(),
    }),
    component: FavoritesPage,
})
