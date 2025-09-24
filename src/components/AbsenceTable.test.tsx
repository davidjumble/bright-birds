import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AbsenceTable } from './AbsenceTable'
import { Absence } from '../types'
import { ThemeProvider } from 'styled-components'
import { theme } from '../theme'
import * as useConflictsModule from '../hooks/useConflicts'

vi.mock('../utils/sortAbsences', () => ({
  sortAbsences: vi.fn((absences) => absences),
}))

vi.mock('../utils/formatters', () => ({
  calculateEndDateISO: vi.fn(() => '2025-12-31'),
  formatAbsenceType: vi.fn((type: string) => `Formatted(${type})`),
}))

vi.mock('../hooks/useConflicts', () => ({
  useConflicts: vi.fn(() => ({ data: {}, isLoading: false })),
}))


const mockAbsences: Absence[] = [
  {
    id: '1',
    employee: { id: 'e1', firstName: 'Alice', lastName: 'Smith' },
    startDate: '2025-09-01T00:00:00Z',
    days: 3,
    absenceType: 'sick',
    approved: true,
  },
  {
    id: '2',
    employee: { id: 'e2', firstName: 'Bob', lastName: 'Jones' },
    startDate: '2025-09-10T00:00:00Z',
    days: 2,
    absenceType: 'holiday',
    approved: false,
  },
]


const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </MemoryRouter>
  )
}

// tests
describe('<AbsenceTable />', () => {
  it('renders table headers', () => {
    renderWithProviders(<AbsenceTable absences={mockAbsences} sortKey="employeeName" />)

    expect(screen.getByRole('columnheader', { name: /Employee/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /Start/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /End/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /Type/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /Status/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /Conflict/i })).toBeInTheDocument()
  })

  it('renders employee capsule buttons with SVG and names', () => {
    renderWithProviders(<AbsenceTable absences={mockAbsences} sortKey="employeeName" />)

    const aliceBtn = screen.getByRole('link', { name: /Alice Smith/i })
    const bobBtn = screen.getByRole('link', { name: /Bob Jones/i })

    expect(aliceBtn).toBeInTheDocument()
    expect(bobBtn).toBeInTheDocument()
    expect(aliceBtn.querySelector('img')).toHaveAttribute('src', '/click.svg')
  })

  it('shows formatted absence type', () => {
    renderWithProviders(<AbsenceTable absences={mockAbsences} sortKey="employeeName" />)

    expect(screen.getByText(/Formatted\(sick\)/)).toBeInTheDocument()
    expect(screen.getByText(/Formatted\(holiday\)/)).toBeInTheDocument()
  })

  it('shows Approved / Pending status', () => {
    renderWithProviders(<AbsenceTable absences={mockAbsences} sortKey="employeeName" />)

    expect(screen.getByText(/Approved/)).toBeInTheDocument()
    expect(screen.getByText(/Pending/)).toBeInTheDocument()
  })

  it('shows OK when no conflicts', () => {
    renderWithProviders(<AbsenceTable absences={mockAbsences} sortKey="employeeName" />)

    expect(screen.getAllByText(/OK/)).toHaveLength(2)
  })

  it('shows OH NO when conflicts exist', () => {
    // Override the useConflicts mock for this test
    useConflictsModule.useConflicts.mockReturnValueOnce({
      data: {
        '1': { conflicts: true },
        '2': { conflicts: false },
      },
      isLoading: false,
    })

    renderWithProviders(<AbsenceTable absences={mockAbsences} sortKey="employeeName" />)

    expect(screen.getByText(/OH NO/)).toBeInTheDocument()
    expect(screen.getByText(/OK/)).toBeInTheDocument()
  })
})
