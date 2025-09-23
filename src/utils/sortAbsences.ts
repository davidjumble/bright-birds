import { Absence } from '../types'
import { SortKey } from '../components/AbsenceTable'

export function sortAbsences(list: Absence[], key: SortKey) {
  const copy = [...list]
  switch (key) {
    case 'startDate':
      return copy.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    case 'endDate':
      return copy.sort(
        (a, b) =>
          new Date(a.startDate).getTime() + (a.days||0) * 86400000 -
          (new Date(b.startDate).getTime() + (b.days||0) * 86400000)
      )
    case 'employeeName':
      return copy.sort((a, b) => {
        const nameA = `${a.employee.firstName} ${a.employee.lastName}`.toLowerCase()
        const nameB = `${b.employee.firstName} ${b.employee.lastName}`.toLowerCase()
        return nameA.localeCompare(nameB)
      })
    case 'absenceType':
      return copy.sort((a, b) => a.absenceType.toLowerCase().localeCompare(b.absenceType.toLowerCase()))
    default:
      return copy
  }
}
