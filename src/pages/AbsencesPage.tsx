import React, { useState } from 'react'
import styled from 'styled-components'
import { useAbsences } from '../hooks/useAbsences'
import { AbsenceTable, SortKey } from '../components/AbsenceTable'

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

const SortSelect = styled.select`
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.colors.highlight};
  border-radius: ${(props) => props.theme.borderRadius};
  background: #fff;
  font-family: ${(props) => props.theme.font};
`

export default function AbsencesPage() {
  const { data, isLoading, error } = useAbsences()
  const [sortKey, setSortKey] = useState<SortKey>('startDate')

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading absences</p>

  return (
    <div>
      <Controls>
        <h2>All Absences</h2>
        <div>
          <label>Sort: </label>
          <SortSelect value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
            <option value="startDate">Start Date</option>
            <option value="endDate">End Date</option>
            <option value="employeeName">Employee</option>
            <option value="absenceType">Type</option>
          </SortSelect>
        </div>
      </Controls>
      <AbsenceTable absences={data || []} sortKey={sortKey} />
    </div>
  )
}
