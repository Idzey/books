import { createFileRoute } from '@tanstack/react-router'
import MainPage from '../pages/MainPage'
import { z } from 'zod'

export const Route = createFileRoute('/')({
  validateSearch: z.object({
    q: z.string().optional(),
    filter: z.string().optional(),
  }),
  component: MainPage,
})