import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTransition from './components/PageTransition';
import NoiseOverlay from './components/NoiseOverlay';
import Router from './router';
import { Suspense } from 'react';
import StaticVideo from './components/StaticVideo';
import StaticCanvas   from './components/StaticCanvas';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [inOut, setInOut] = useState(false);
  const [nextPath, setNextPath] = useState(null);

  // trigger a wipe transition then navigate
  const go = (path) => {
    if (location.pathname === path) return;
    setNextPath(path);
    setInOut(true);
  };

  // after wipe-out, perform navigation & wipe-in
  const onTransitionFinish = () => {
    if (inOut && nextPath) {
      navigate(nextPath);
      setInOut(false);
    }
  };

  return (
    <>
      
      <NoiseOverlay/>
      <PageTransition inOut={inOut} onFinish={onTransitionFinish} />
      <Suspense fallback={<div className="loader">Loading…</div>}>
        <Router go={go} />
      </Suspense>
    </>
  );
}
