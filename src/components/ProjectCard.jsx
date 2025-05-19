import { useState } from "react"

function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="project" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={project.image || "/placeholder.svg"} alt={project.alt || project.title} />
      <div 
        className="project-info" 
        style={{ transform: isHovered ? "translateY(0)" : "translateY(100%)" }}
      >
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </div>
  )
}

export default ProjectCard