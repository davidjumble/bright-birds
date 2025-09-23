export type Employee = {
    id: string
    firstName: string
    lastName: string
  }
  
  export type Absence = {
    id: number
    startDate: string
    days: number
    absenceType: string
    approved: boolean
    employee: Employee
  }
  