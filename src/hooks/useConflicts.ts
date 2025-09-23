import { useQuery } from '@tanstack/react-query'
import pLimit from 'p-limit'

const API = 'https://front-end-kata.brighthr.workers.dev/api'
const limit = pLimit(5)

async function fetchConflict(id: number){
  const r = await fetch(`${API}/conflict/${id}`)
  if(!r.ok) throw new Error('conflict fetch failed')
  return r.json()
}

export async function fetchConflictsBatch(ids: number[]){
  const promises = ids.map(id => limit(() => fetchConflict(id)))
  const settled = await Promise.allSettled(promises)
  const results = settled.map(s => s.status === 'fulfilled' ? (s as PromiseFulfilledResult<any>).value : null)
  const map: Record<number, any> = {}
  results.forEach((res, idx) => {
    map[ids[idx]] = res
  })
  return map
}

export function useConflicts(ids: number[]){
  return useQuery({
    queryKey: ['conflicts', ids],
    queryFn: () => fetchConflictsBatch(ids),
    enabled: ids.length > 0,
    staleTime: 1000 * 60 * 5
  })
}
