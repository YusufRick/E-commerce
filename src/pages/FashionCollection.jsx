import React from 'react';
import { motion } from 'framer-motion';

const items = [1,2,3,4].map(i => ({
  id: i,
  name: `Fashion ${i}`,
  price: `$${i*50 + 50}`,
  image: `/src/assets/fashion-${i}.jpg`
}));

const listVars = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
};
const itemVars = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function FashionCollection({ go }) {
  return (
    <div className="fashion">
      <h2>Fashion Collection</h2>
      <motion.div
        className="grid"
        variants={listVars}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map(item => (
          <motion.button
            key={item.id}
            className="item"
            variants={itemVars}
            onClick={() => go(`/product/${item.id}`)}
          >
            <img src={item.image} alt={item.name} loading="lazy" />
            <p>{item.name}</p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
