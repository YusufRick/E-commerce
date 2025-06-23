import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import visual1 from '../assets/visual1.png';
import visual2 from '../assets/visual2.gif';
import visual3 from '../assets/visual3.png';

const visuals = [
  { id: 1, name: 'Visual 1', description: '', image: visual1 },
  { id: 2, name: 'Visual 2', description: '', image: visual2 },
  { id: 3, name: 'Visual 3', description: '', image: visual3 },

];

export default function ViewVisual() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const visual = visuals[id];

  return (
    <div className="product-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="product-details">
        <img src={visual.image} alt={visual.name} loading="lazy" />
        <div className="info">
          <h1>{visual.name}</h1>
          <p className="price">Description: {visual.description}</p>

        </div>
      </div>
    </div>
  );
}
