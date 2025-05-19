import ProjectCard from "./ProjectCard"

function FeaturedProjects() {
  const projects = [
    {
      id: 1,
      title: "PROJECT TITLE",
      description: "Creative direction and visual identity",
      image: "assets/pic1.png",
      alt: "Project 1",
    },
    {
      id: 2,
      title: "SHORT FILM",
      description: "Direction and production",
      image: "/placeholder.svg?height=400&width=300",
      alt: "Project 2",
    },
    {
      id: 3,
      title: "FASHION COLLECTION",
      description: "Design and creative direction",
      image: "/placeholder.svg?height=400&width=300",
      alt: "Project 3",
    },
  ]

  return (
    <section className="featured">
      <h2>FEATURED PROJECTS</h2>
      <div className="projects">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedProjects
