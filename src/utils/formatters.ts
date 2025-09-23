export function formatAbsenceType(type: string): string {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
  }
  
  export function calculateEndDateISO(start: string, days: number) {
    const end = new Date(new Date(start).getTime() + (days||0)*86400000)
    return end.toISOString().split('T')[0]
  }
  