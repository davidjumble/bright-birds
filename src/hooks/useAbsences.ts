import { useQuery } from '@tanstack/react-query'
import { Absence } from '../types'

const API = 'https://front-end-kata.brighthr.workers.dev/api/absences'

async function fetchAbsences(): Promise<Absence[]>{
  const r = await fetch(API)
  if(!r.ok) throw new Error('Failed to fetch absences')
  return r.json()
}

export function useAbsences(){
  return useQuery({
    queryKey: ['absences'],
    queryFn: fetchAbsences,
    staleTime: 1000 * 60 * 2
  })
}
