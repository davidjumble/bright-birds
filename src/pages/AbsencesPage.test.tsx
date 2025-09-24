import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AbsencesPage from './AbsencesPage'
import { ThemeProvider } from 'styled-components'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { theme } from '../theme'
import { useAbsences } from '../hooks/useAbsences'

vi.mock('../hooks/useAbsences')

const mockedUseAbsences = useAbsences as unknown as vi.Mock

const renderWithProviders = (ui: React.ReactNode) => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{ui}</ThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  )
}

describe('<AbsencesPage />', () => {
  it('renders loading state', () => {
    mockedUseAbsences.mockReturnValue({ data: undefined, isLoading: true, error: null })
    renderWithProviders(<AbsencesPage />)
    expect(screen.getByText(/Loading/i)).toBeInTheDocument()
  })

  it('renders error state', () => {
    mockedUseAbsences.mockReturnValue({ data: undefined, isLoading: false, error: new Error('fail') })
    renderWithProviders(<AbsencesPage />)
    expect(screen.getByText(/Error loading absences/i)).toBeInTheDocument()
  })

  it('renders AbsenceTable with data', () => {
    mockedUseAbsences.mockReturnValue({
      data: [
        { id: '1', employee: { id: 'e1', firstName: 'Alice', lastName: 'Smith' }, startDate: '2025-09-01', endDate: '2025-09-02', absenceType: 'sick', approved: true },
      ],
      isLoading: false,
      error: null,
    })
    renderWithProviders(<AbsencesPage />)
    expect(screen.getByText(/Alice/i)).toBeInTheDocument()
  })

  it('allows changing sort key', () => {
    mockedUseAbsences.mockReturnValue({ data: [], isLoading: false, error: null })
    renderWithProviders(<AbsencesPage />)
    const select = screen.getByLabelText(/Sort/i)
    fireEvent.change(select, { target: { value: 'employeeName' } })
    expect((select as HTMLSelectElement).value).toBe('employeeName')
  })
})
