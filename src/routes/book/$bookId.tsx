import { createFileRoute } from '@tanstack/react-router'
import BookPage from '../../pages/BookPage'

export const Route = createFileRoute('/book/$bookId')({
  component: BookPage,
})