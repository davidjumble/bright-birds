import { useQuery } from '@tanstack/react-query'
import { Absence } from '../types'

const API = 'https://front-end-kata.brighthr.workers.dev/api/absences'

async function fetchAbsences(): Promise<Absence[]> {
  const res = await fetch(API)
  if (!res.ok) throw new Error('Failed to fetch absences')
  return res.json()
}

export function useAbsences() {
  return useQuery({
    queryKey: ['absences'],
    queryFn: fetchAbsences,
  })
}
