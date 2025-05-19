import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

function Projects() {
  const [projects] = useState([
    {
      id: 1,
      title: "VISUAL IDENTITY",
      description: "Brand development and creative direction",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 2,
      title: "PHOTOGRAPHY SERIES",
      description: "Experimental photography collection",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 3,
      title: "INSTALLATION ART",
      description: "Mixed media spatial experience",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 4,
      title: "DIGITAL EXPERIENCE",
      description: "Interactive web-based project",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 5,
      title: "PRINT COLLECTION",
      description: "Limited edition art prints",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 6,
      title: "COLLABORATIVE WORK",
      description: "Artist collaboration series",
      image: "/placeholder.svg?height=400&width=300",
    }
  ]);

  return (
    <div className="page-content">
      <h1 className="page-title">Projects</h1>
      <p className="page-description">
        Explore our collection of creative projects spanning various mediums and disciplines.
        Each project represents our commitment to pushing boundaries and creating meaningful experiences.
      </p>
      
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <style jsx>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 40px;
          margin-top: 60px;
        }
      `}</style>
    </div>
  );
}

export default Projects;