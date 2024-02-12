import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SpinningCube = ({ textureImages }) => {
  const canvasRef = useRef();
  const cubesRef = useRef([]);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const totalWidth = textureImages.length * 2;

    textureImages.forEach((textureImg, index) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1, 32, 32, 32);
      const texture = new THREE.TextureLoader().load(textureImg);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const cube = new THREE.Mesh(geometry, material);

      const startPositionX = -(totalWidth / 2) + (index * 2) + 1
      cube.position.x = startPositionX;
      
      scene.add(cube);
      cubesRef.current.push(cube);
    });

    const onMouseDown = (event) => {
      event.preventDefault();
      const intersects = getIntersects(event.clientX, event.clientY);
      if (intersects.length > 0) {
        const pickedCube = intersects[0].object;
        pickedCube.userData.isDragging = true;
        pickedCube.userData.previousMousePosition = {
          x: event.clientX,
          y: event.clientY,
        };
      }
    };

    const onMouseUp = () => {
      cubesRef.current.forEach(cube => cube.userData.isDragging = false);
    };

    const onMouseMove = (event) => {
      cubesRef.current.forEach(cube => {
        if (cube.userData.isDragging) {
          const deltaMove = {
            x: event.clientX - cube.userData.previousMousePosition.x,
            y: event.clientY - cube.userData.previousMousePosition.y,
          };
          cube.rotation.x += deltaMove.y * 0.01;
          cube.rotation.y += deltaMove.x * 0.01;
          cube.userData.previousMousePosition = {
            x: event.clientX,
            y: event.clientY,
          };
        }
      });
    };

    const getIntersects = (x, y) => {
      x = (x / window.innerWidth) * 2 - 1;
      y = - (y / window.innerHeight) * 2 + 1;
      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);
      const raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
      return raycaster.intersectObjects(scene.children, true);
    };

    // Add event listeners conditionally if canvasRef.current is not null
    if (canvasRef.current) {
      canvasRef.current.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('mousemove', onMouseMove);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      cubesRef.current.forEach(cube => {
        cube.rotation.x += 0.001;
        cube.rotation.y += 0.001;
      });
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      // Remove event listeners only if canvasRef.current is not null
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousedown', onMouseDown);
      }
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animate);
    };
  }, [textureImages]);

  return <canvas ref={canvasRef} />;
};

export default SpinningCube;
