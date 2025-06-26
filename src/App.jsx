import React, { useState,useRef,useEffect, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements }   from '@stripe/react-stripe-js';

import Router         from './router';
import bgAudioFile from './assets/CHRYSALIS_WEBSITE.mp3';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isWiping, setIsWiping] = useState(false);
  const [nextPath, setNextPath] = useState(location.pathname);
  const audioRef = useRef(null);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // autoplay blocked, but still muted
      });
    }
  }, []);

  // 2️⃣ On first click anywhere, unmute so you actually hear it
  useEffect(() => {
    const unmute = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(() => {});
      }
      window.removeEventListener('click', unmute);
    };
    window.addEventListener('click', unmute);
    return () => window.removeEventListener('click', unmute);
  }, []);
  // Called by pages instead of useNavigate()
  const go = (path) => {
    if (path === location.pathname) return;
    setNextPath(path);
    setIsWiping(true);
  };

  // After the wipe‐out finishes, do the actual navigation
  const onWipeComplete = () => {
    navigate(nextPath);
    setIsWiping(false);
  };

  return (
    <>

    <audio
        ref={audioRef}
        src={bgAudioFile}
        autoPlay
        loop
        muted
        style={{ display: 'none' }}
      />
      

      {/* Wipe‐out overlay */}
      <AnimatePresence>
        {isWiping && (
          <motion.div
            key="wipe"
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 100% 0% 0%)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 0, left: 0,
              width: '100vw', height: '100vh',
              background: '#000',
              zIndex: 9999,
              pointerEvents: 'none'
            }}
            onAnimationComplete={onWipeComplete}
          />
        )}
      </AnimatePresence>

      {/* Your actual routes fade in/out */}
      <div style={{ pointerEvents: isWiping ? 'none' : 'auto' }}>

        <Elements stripe={stripePromise}>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <Suspense fallback={<div className="loader">Loading…</div>}>
              <Router go={go} />
            </Suspense>
          </motion.div>
        </AnimatePresence>
        </Elements>
        
        
        
      </div>
    </>
  );
}
