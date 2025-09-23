import { useQuery } from '@tanstack/react-query'

const API = 'https://front-end-kata.brighthr.workers.dev/api'

async function fetchConflict(id: number) {
  const res = await fetch(`${API}/conflict/${id}`)
  if (!res.ok) throw new Error('Failed to fetch conflict')
  return res.json()
}

export function useConflicts(id: number) {
  return useQuery({
    queryKey: ['conflict', id],
    queryFn: () => fetchConflict(id),
    enabled: !!id,
  })
}
