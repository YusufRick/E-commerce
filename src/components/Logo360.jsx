import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function Logo360() {
  const mountRef = useRef(null);

  useEffect(() => {
    const width  = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // lower-poly sphere for perf
    const texture  = new THREE.TextureLoader().load('/src/assets/logo-globe.png');
    const geometry = new THREE.SphereGeometry(1, 16, 16);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere   = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const animate = () => {
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="logo-360" />;
}

export default React.memo(Logo360);
