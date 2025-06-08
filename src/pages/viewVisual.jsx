import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const visuals = {
  1: { id:1, name:'V1', description:'bla bla bla', image:'/src/assets/fashion-1.jpg', available: true},
  2: { id:2, name:'V2', description:'bla bla bla', image:'/src/assets/fashion-2.jpg', available: true },
  3: { id:3, name:'V3', description:'blu blu ble', image:'/src/assets/fashion-3.jpg', available: true },
  4: { id:4, name:'V4', description:'blueekk', image:'/src/assets/fashion-4.jpg', available: true }
};

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
