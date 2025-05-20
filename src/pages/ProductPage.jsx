import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const products = {
  1: { id:1, name:'Fashion 1', price:'$100', image:'/src/assets/fashion-1.jpg' },
  2: { id:2, name:'Fashion 2', price:'$150', image:'/src/assets/fashion-2.jpg' },
  3: { id:3, name:'Fashion 3', price:'$200', image:'/src/assets/fashion-3.jpg' },
  4: { id:4, name:'Fashion 4', price:'$250', image:'/src/assets/fashion-4.jpg' }
};

export default function ProductPage() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const product = products[id];

  return (
    <div className="product-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="product-details">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="info">
          <h1>{product.name}</h1>
          <p className="price">{product.price}</p>
          <button className="add-cart-btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
