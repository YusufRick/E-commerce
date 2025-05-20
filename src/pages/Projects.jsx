import React from 'react';
import { useNavigate } from 'react-router-dom';


const items = [1, 2, 3, 4].map((i) => ({
  id: i,
  name: `Projects ${i}`,
  price: `$${i * 50 + 50}`,
  image: `/src/assets/projects-${i}.jpg`,
}));

export default function Projects() {
  const navigate = useNavigate();
  return (
    <div className="card">
      
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      
      <h2 className='Tittle'>PROJECTS</h2>

      <div className="grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="item"
            onClick={() => navigate(`/product/${item.id}`)}
          >
            <img src={item.image} alt={item.name} loading="lazy" />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
