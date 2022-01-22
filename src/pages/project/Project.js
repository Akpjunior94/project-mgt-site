import React from 'react'
import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import './Project.css'
import ProjectComment from './ProjectComment'
import ProjectSummary from './ProjectSummary'

const Project = () => {
  const { id } = useParams()
  const { document, error } = useDocument('projects', id)

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }


  return (
    <div className="project-details">
      <ProjectSummary project={document}/>
      <ProjectComment project={document}/>
    </div>
  )
}

export default Project;
