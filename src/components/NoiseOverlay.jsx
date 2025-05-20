// src/components/NoiseOverlay.jsx
import React, { useRef, useEffect } from 'react';

export default function NoiseOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // low-res so it’s cheap to redraw
    const w = canvas.width = 256;
    const h = canvas.height = 256;
    let frameId;

    function draw() {
      const id = ctx.createImageData(w, h);
      const buf = new Uint32Array(id.data.buffer);
      for (let i = 0; i < buf.length; i++) {
        // black or white pixel
        buf[i] = Math.random() < 0.5 ? 0xff000000 : 0xffffffff;
      }
      ctx.putImageData(id, 0, 0);
      frameId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return <canvas className="noise-overlay" ref={canvasRef} />;
}
