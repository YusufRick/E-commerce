function Shorts() {
  const shortFilms = [
    {
      id: 1,
      title: "ECHOES",
      duration: "12:45",
      year: "2023",
      description: "An exploration of memory and time through abstract visuals and sound design.",
      thumbnail: "/placeholder.svg?height=400&width=300"
    },
    {
      id: 2,
      title: "FRAGMENTS",
      duration: "08:30",
      year: "2022",
      description: "A non-linear narrative examining the fragmented nature of human experience.",
      thumbnail: "/placeholder.svg?height=400&width=300"
    },
    {
      id: 3,
      title: "LIMINAL",
      duration: "15:20",
      year: "2022",
      description: "A visual meditation on transitional spaces and in-between moments.",
      thumbnail: "/placeholder.svg?height=400&width=300"
    }
  ];

  return (
    <div className="page-content">
      <h1 className="page-title">Short Films</h1>
      <p className="page-description">
        Our short film collection showcases experimental narratives and visual storytelling.
        Each piece explores different aspects of human experience through cinematic language.
      </p>
      
      <div className="shorts-container">
        {shortFilms.map(film => (
          <div className="short-film" key={film.id}>
            <div className="film-thumbnail">
              <img src={film.thumbnail || "/placeholder.svg"} alt={film.title} />
              <div className="play-button">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                </svg>
              </div>
            </div>
            <div className="film-info">
              <h2>{film.title}</h2>
              <div className="film-meta">
                <span>{film.duration}</span>
                <span className="year">{film.year}</span>
              </div>
              <p>{film.description}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .shorts-container {
          display: flex;
          flex-direction: column;
          gap: 80px;
          margin-top: 60px;
        }
        
        .short-film {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }
        
        @media (max-width: 768px) {
          .short-film {
            grid-template-columns: 1fr;
          }
        }
        
        .film-thumbnail {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/9;
          background: #111;
        }
        
        .film-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .film-thumbnail:hover img {
          transform: scale(1.05);
        }
        
        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: rgba(0,0,0,0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .play-button:hover {
          background: rgba(0,0,0,0.7);
        }
        
        .film-info h2 {
          font-size: 32px;
          margin-bottom: 15px;
          letter-spacing: -0.75px;
        }
        
        .film-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          opacity: 0.7;
        }
        
        .year {
          position: relative;
        }
        
        .year:before {
          content: '';
          position: absolute;
          left: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 3px;
          background: #fff;
          border-radius: 50%;
        }
        
        .film-info p {
          line-height: 1.6;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

export default Shorts;