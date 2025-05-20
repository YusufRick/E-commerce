import React, { useRef, useEffect } from 'react';

export default function StaticCanvas({ opacity = 0.08, resolution = 128,fps=100 }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const size   = resolution;
    let frameId;

    canvas.width  = size;
    canvas.height = size;

    function draw() {
      // generate 1‐bit noise
      const imageData = ctx.createImageData(size, size);
      const buf       = new Uint32Array(imageData.data.buffer);
      for (let i = 0; i < buf.length; i++) {
        buf[i] = Math.random() < 0.8 
          ? 0xff000000  // black
          : 0xffffffff; // white
      }
      ctx.putImageData(imageData, 0, 0);

      // stretch & composite
      ctx.save();
      ctx.globalAlpha   = opacity;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(canvas, 0, 0, window.innerWidth, window.innerHeight);
      ctx.restore();


    }

    const interval = setInterval(draw,100/fps);
      return () => clearInterval(interval);
  }, [opacity, resolution,fps]);

  return (
    <canvas
      ref={canvasRef}
      className="static-canvas"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        imageRendering: 'pixelated'
      }}
    />
  );
}
