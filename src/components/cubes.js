// cubes.js

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SpinningCube = ({ textureImages }) => {
  const canvasRef = useRef();
  const mouseDownRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cubesRef = useRef([]);

  useEffect(() => {
    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add cubes
    textureImages.forEach((textureImg, index) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1, 32, 32, 32);
      const texture = new THREE.TextureLoader().load(textureImg);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = index * 2; // Adjust position for each cube
      scene.add(cube);
      cubesRef.current.push(cube);
    });

    // Handle mouse down event
    const onMouseDown = (event) => {
      mouseDownRef.current = true;
      previousMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    // Handle mouse up event
    const onMouseUp = () => {
      mouseDownRef.current = false;
    };

    // Handle mouse move event
    const onMouseMove = (event) => {
      if (!mouseDownRef.current) return;

      const deltaMove = {
        x: event.clientX - previousMousePositionRef.current.x,
        y: event.clientY - previousMousePositionRef.current.y,
      };

      cubesRef.current.forEach((cube) => {
        cube.rotation.y += deltaMove.x * 0.01;
        cube.rotation.x += deltaMove.y * 0.01;
      });

      previousMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    // Add event listeners
    canvasRef.current.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      // Stop animation loop
      cancelAnimationFrame(animate);
      // Remove event listeners
      canvasRef.current.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [textureImages]);

  return <canvas ref={canvasRef} />;
};

export default SpinningCube;
