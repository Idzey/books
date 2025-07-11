import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/favorites/favorites')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/favorites/favorites"!</div>
}
