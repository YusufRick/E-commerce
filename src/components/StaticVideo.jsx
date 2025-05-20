// src/components/StaticVideo.jsx
import React from 'react';

export default function StaticVideo({ opacity = 0.15 }) {
  return (
    <video
      className="tv-static-video"
      src="/static.mp4"
      loop
      muted
      autoPlay
      playsInline
      style={{ opacity }}
    />
  );
}
