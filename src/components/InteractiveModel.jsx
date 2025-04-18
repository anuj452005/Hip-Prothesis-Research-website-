import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Box, Button, CircularProgress, Typography, Tooltip } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const InteractiveModel = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [hotspots, setHotspots] = useState([]);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [explodedView, setExplodedView] = useState(false);
  const [componentsVisible, setComponentsVisible] = useState({
    acetabularCup: true,
    femoral: true,
    stem: true,
    liner: true
  });

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      45, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Load model
    const loader = new GLTFLoader();
    // Note: In a real implementation, you would need to convert the Sketchfab model to glTF format
    // This is a placeholder URL - you'll need to replace with your actual model
    loader.load(
      '/models/hip_prosthesis.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        scene.add(model);
        modelRef.current = model;
        
        // Create hotspots after model is loaded
        createHotspots();
        setLoading(false);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error happened', error);
        setLoading(false);
      }
    );

    // Handle window resize
    const handleResize = () => {
      if (containerRef.current && cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  // Create hotspots for the model
  const createHotspots = () => {
    // These positions would need to be adjusted based on your actual model
    const hotspotsData = [
      { 
        id: 'acetabularCup', 
        position: new THREE.Vector3(0.5, 0.5, 0), 
        title: 'Acetabular Cup',
        description: 'The socket component that replaces the acetabulum. Usually made of metal with a plastic, ceramic or metal liner.'
      },
      { 
        id: 'femoral', 
        position: new THREE.Vector3(-0.5, 0, 0), 
        title: 'Femoral Head',
        description: 'The ball component that replaces the head of the femur. Can be made of metal or ceramic materials.'
      },
      { 
        id: 'liner', 
        position: new THREE.Vector3(0.3, 0.3, 0.3), 
        title: 'Liner',
        description: 'Fits inside the acetabular cup and provides a smooth surface for the femoral head to articulate against.'
      },
      { 
        id: 'stem', 
        position: new THREE.Vector3(-0.3, -0.5, 0), 
        title: 'Femoral Stem',
        description: 'Inserted into the femur to support the femoral head. Usually made of titanium or cobalt-chromium alloys.'
      }
    ];

    setHotspots(hotspotsData);
  };

  // Handle hotspot click
  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(hotspot);
  };

  // Toggle exploded view
  const toggleExplodedView = () => {
    setExplodedView(!explodedView);
    
    if (modelRef.current) {
      // This is a simplified example - in a real implementation, 
      // you would need to identify and move specific parts of the model
      modelRef.current.children.forEach((child, index) => {
        if (explodedView) {
          // Reset positions
          child.position.set(0, 0, 0);
        } else {
          // Move parts away from center
          const direction = new THREE.Vector3(
            Math.cos(index * Math.PI / 2),
            Math.sin(index * Math.PI / 2),
            0
          ).normalize();
          child.position.copy(direction.multiplyScalar(0.5));
        }
      });
    }
  };

  // Toggle component visibility
  const toggleComponentVisibility = (componentId) => {
    setComponentsVisible({
      ...componentsVisible,
      [componentId]: !componentsVisible[componentId]
    });
    
    if (modelRef.current) {
      // Find and toggle visibility of the component
      // This is a simplified example - in a real implementation,
      // you would need to identify specific parts of the model
      modelRef.current.traverse((child) => {
        if (child.name && child.name.includes(componentId)) {
          child.visible = !componentsVisible[componentId];
        }
      });
    }
  };

  // Zoom controls
  const handleZoom = (zoomIn) => {
    if (cameraRef.current) {
      const zoomSpeed = 0.5;
      const direction = zoomIn ? -1 : 1;
      cameraRef.current.position.z += direction * zoomSpeed;
    }
  };

  // Reset view
  const resetView = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 0, 5);
      controlsRef.current.reset();
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '600px', mb: 4 }}>
      {loading && (
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'rgba(245, 245, 245, 0.7)',
          zIndex: 10
        }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Loading 3D Model...
          </Typography>
        </Box>
      )}
      
      <Box ref={containerRef} sx={{ width: '100%', height: '100%' }} />
      
      {/* Control panel */}
      <Box sx={{ 
        position: 'absolute', 
        bottom: 16, 
        left: 16, 
        display: 'flex', 
        gap: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 1,
        borderRadius: 1
      }}>
        <Tooltip title="Zoom In">
          <Button 
            variant="contained" 
            color="primary" 
            size="small"
            onClick={() => handleZoom(true)}
          >
            <ZoomInIcon />
          </Button>
        </Tooltip>
        
        <Tooltip title="Zoom Out">
          <Button 
            variant="contained" 
            color="primary" 
            size="small"
            onClick={() => handleZoom(false)}
          >
            <ZoomOutIcon />
          </Button>
        </Tooltip>
        
        <Tooltip title="Reset View">
          <Button 
            variant="contained" 
            color="primary" 
            size="small"
            onClick={resetView}
          >
            <CenterFocusStrongIcon />
          </Button>
        </Tooltip>
        
        <Tooltip title={explodedView ? "Collapse View" : "Exploded View"}>
          <Button 
            variant="contained" 
            color={explodedView ? "secondary" : "primary"} 
            size="small"
            onClick={toggleExplodedView}
          >
            <ViewInArIcon />
          </Button>
        </Tooltip>
      </Box>
      
      {/* Component visibility toggles */}
      <Box sx={{ 
        position: 'absolute', 
        top: 16, 
        right: 16, 
        display: 'flex', 
        flexDirection: 'column',
        gap: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 1,
        borderRadius: 1
      }}>
        {Object.keys(componentsVisible).map((componentId) => (
          <Tooltip key={componentId} title={`${componentsVisible[componentId] ? 'Hide' : 'Show'} ${componentId}`}>
            <Button 
              variant="contained" 
              color={componentsVisible[componentId] ? "primary" : "secondary"} 
              size="small"
              onClick={() => toggleComponentVisibility(componentId)}
              startIcon={componentsVisible[componentId] ? <VisibilityIcon /> : <VisibilityOffIcon />}
            >
              {componentId.charAt(0).toUpperCase() + componentId.slice(1)}
            </Button>
          </Tooltip>
        ))}
      </Box>
      
      {/* Hotspots */}
      {hotspots.map((hotspot) => (
        <Tooltip key={hotspot.id} title={hotspot.title}>
          <Button 
            sx={{ 
              position: 'absolute', 
              left: `${(hotspot.position.x + 1) * 50}%`, 
              top: `${(-hotspot.position.y + 1) * 50}%`,
              width: 20,
              height: 20,
              minWidth: 'unset',
              borderRadius: '50%',
              backgroundColor: selectedHotspot?.id === hotspot.id ? 'secondary.main' : 'primary.main',
              '&:hover': {
                backgroundColor: 'secondary.main',
              }
            }}
            onClick={() => handleHotspotClick(hotspot)}
          />
        </Tooltip>
      ))}
      
      {/* Selected hotspot information */}
      {selectedHotspot && (
        <Box sx={{ 
          position: 'absolute', 
          bottom: 16, 
          right: 16, 
          width: 300,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: 2,
          borderRadius: 1,
          boxShadow: 3
        }}>
          <Typography variant="h6" gutterBottom>
            {selectedHotspot.title}
          </Typography>
          <Typography variant="body2">
            {selectedHotspot.description}
          </Typography>
          <Button 
            size="small" 
            sx={{ mt: 1 }}
            onClick={() => setSelectedHotspot(null)}
          >
            Close
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default InteractiveModel;
