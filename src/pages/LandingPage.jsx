import React from 'react';
import Logo360 from '../components/Logo360';

export default function LandingPage({ go }) {
  
  return (
    <div className="landing">
      <Logo360 />
      <button className="start-btn" onClick={() => go('/home')}>
        Start
      </button>
    </div>
  );
}
