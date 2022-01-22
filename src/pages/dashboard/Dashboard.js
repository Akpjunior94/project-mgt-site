import React, { useState } from 'react'
import ProjectList from '../../components/ProjectList'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import './Dashboard'
import ProjectFilter from './ProjectFilter'

const Dashboard = () => {
  const { user } = useAuthContext()
  const { documents, error } = useCollection('projects')
  const [currentFilter, setCurrentFilter] = useState('all')


  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }


  const filteredProjects = documents ? documents.filter((project) => {
    switch (currentFilter) {
      case 'all':
        return true
      case 'mine':
        let assignedToMe = false
        project.assignedUsersList.forEach((u) => {
          if (user.uid === u.id) {
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        return project.category === currentFilter
    }
  }) : null


  return (
    <div>
      <h2>Dashboard</h2>
      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
      {error && <p>{error}</p>}
      {filteredProjects && <ProjectList projects={filteredProjects} />}
    </div>
  )
}

export default Dashboard;
