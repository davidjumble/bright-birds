import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Absence } from '../types'
import { sortAbsences } from '../utils/sortAbsences'
import { formatAbsenceType, calculateEndDateISO } from '../utils/formatters'
import { Link } from 'react-router-dom'
import { useConflicts } from '../hooks/useConflicts'

export type SortKey = 'startDate' | 'endDate' | 'employeeName' | 'absenceType'

// Styled components
const TableWrapper = styled.div`
  overflow-x: auto;
  padding: 1rem;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
`

const HeaderCell = styled.th`
  text-align: left;
  padding: 8px;
  color: ${(props) => props.theme.colors.highlight};
`

const Row = styled.tr<{ $conflict: boolean }>`
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.highlight};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  color: ${(props) => props.theme.colors.highlight};

  td {
    padding: 8px;
  }

  ${(props) =>
    props.$conflict &&
    `
    background: #ffe5e0;
  `}
`

const Badge = styled.span`
  display: inline-block;
  padding: 2px 6px;
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.colors.highlight};
  font-size: 0.8rem;
`

// New: styled employee button
const EmployeeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: orange;
  color: white;
  padding: 6px 14px;
  border-radius: 9999px; /* capsule shape */
  font-weight: 500;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.2s;

  &:hover {
    background: darkorange;
  }

  img {
    width: 50px;
    height: 50px;
  }
`

export function AbsenceTable({ absences, sortKey }: { absences: Absence[]; sortKey: SortKey }) {
  const sorted = useMemo(() => sortAbsences(absences, sortKey), [absences, sortKey])

  // collect ids visible to table to fetch conflicts in batch
  const ids = useMemo(() => sorted.map((s) => s.id), [sorted])
  const { data: conflictsMap, isLoading: conflictsLoading } = useConflicts(ids)

  return (
    <TableWrapper role="table">
      <StyledTable role="grid">
        <thead>
          <tr>
            <HeaderCell>Employee</HeaderCell>
            <HeaderCell>Start</HeaderCell>
            <HeaderCell>End</HeaderCell>
            <HeaderCell>Type</HeaderCell>
            <HeaderCell>Status</HeaderCell>
            <HeaderCell>Conflict</HeaderCell>
          </tr>
        </thead>
        <tbody>
          {sorted.map((a) => {
            const end = calculateEndDateISO(a.startDate, a.days)
            const conflict = conflictsMap ? conflictsMap[a.id] : null
            return (
              <Row key={a.id} $conflict={!!(conflict && conflict.conflicts)}>
                <td>
                  <EmployeeButton to={`/employee/${a.employee.id}`}>
                    <img src="/click.svg" alt="" />
                    {a.employee.firstName} {a.employee.lastName}
                  </EmployeeButton>
                </td>
                <td>{a.startDate.split('T')[0]}</td>
                <td>{end}</td>
                <td>{formatAbsenceType(a.absenceType)}</td>
                <td>{a.approved ? 'Approved' : 'Pending'}</td>
                <td>
                  {conflictsLoading ? (
                    '...'
                  ) : conflict && conflict.conflicts ? (
                    <Badge>OH NO</Badge>
                  ) : (
                    <Badge>OK</Badge>
                  )}
                </td>
              </Row>
            )
          })}
        </tbody>
      </StyledTable>
    </TableWrapper>
  )
}
