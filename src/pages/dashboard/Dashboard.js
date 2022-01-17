import React from 'react'
import ProjectList from '../../components/ProjectList'
import { useCollection } from '../../hooks/useCollection'
import './Dashboard'

const Dashboard = () => {
  const { documents, error } = useCollection('projects')

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <p>{error}</p>}
      {documents && <ProjectList projects={documents} />}
    </div>
  )
}

export default Dashboard;
