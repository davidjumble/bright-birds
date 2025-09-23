import React from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAbsences } from '../hooks/useAbsences'
import { AbsenceTable } from '../components/AbsenceTable'

const BackLink = styled(Link)`
  color: ${(props) => props.theme.colors.highlight};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`

const Heading = styled.h2`
  color: ${(props) => props.theme.colors.highlight};
  margin-top: 0.5rem;
`

export default function EmployeePage() {
  const { id } = useParams()
  const { data, isLoading, error } = useAbsences()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading absences</p>

  const rows = (data || []).filter((a) => String(a.employee.id) === id)

  return (
    <div>
      <p>
        <BackLink to="/">← Back</BackLink>
      </p>
      <Heading>Absences for {id}</Heading>
      <AbsenceTable absences={rows} sortKey="startDate" />
    </div>
  )
}
