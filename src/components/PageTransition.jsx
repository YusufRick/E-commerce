import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function PageTransition({ inOut, onFinish }) {
  const mount = useRef();
  const matRef = useRef();

  useEffect(() => {
    const width  = window.innerWidth;
    const height = window.innerHeight;
    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -width/2, width/2, height/2, -height/2, 0.1, 10
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    mount.current.appendChild(renderer.domElement);

    const loader  = new THREE.TextureLoader();
    const dispTex = loader.load('/src/assets/disp-map.jpg');
    const dummy  = new THREE.Texture();

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uProgress: { value: inOut ? 0 : 1 },
        uDisp:      { value: dispTex },
        uTexture1:  { value: dummy },
        uTexture2:  { value: dummy }
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        uniform float uProgress;
        uniform sampler2D uDisp, uTexture1, uTexture2;
        varying vec2 vUv;
        void main(){
          vec4 d = texture2D(uDisp, vUv);
          vec2 dir = vec2(0.1, 0.0);
          vec2 uv1 = vUv + dir * (1.0 - uProgress) * d.r;
          vec2 uv2 = vUv - dir * uProgress * d.r;
          vec4 c1 = texture2D(uTexture1, uv1);
          vec4 c2 = texture2D(uTexture2, uv2);
          gl_FragColor = mix(c1, c2, uProgress);
        }
      `,
      transparent: true,                 // ← allow alpha in your shader to composite
      blending: THREE.NormalBlending,
    });
    matRef.current = mat;

    const geo = new THREE.PlaneBufferGeometry(width, height);
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const loop = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    };
    loop();

    return () => {
      mount.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (!matRef.current) return;
    const prog = matRef.current.uniforms.uProgress;
    if (inOut) {
      gsap.to(prog, {
        value: 1, duration: 0.8, ease: 'power2.inOut', onComplete: onFinish
      });
    } else {
      gsap.to(prog, { value: 0, duration: 0.8, ease: 'power2.inOut' });
    }
  }, [inOut]);

  return (
    <div
      ref={mount}
      className="page-transition-canvas"
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none', zIndex: 9999
      }}
    />
  );
}
