import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text } from '@react-three/drei';
import { Box, Paper, Typography, Slider, FormControl, InputLabel, Select, MenuItem, Grid, Button, Chip, Tabs, Tab, Card, CardContent, CardMedia } from '@mui/material';
import * as THREE from 'three';
import stressAnalysisService from '../services/StressAnalysisService';

// Material properties for different prosthesis materials
const materialProperties = {
  titanium: {
    name: 'Titanium Alloy',
    color: '#B4C7DC',
    youngsModulus: 110, // GPa
    yieldStrength: 880, // MPa
    density: 4.5, // g/cm³
    maxDeformation: 0.05 // For visualization purposes
  },
  cobaltChrome: {
    name: 'Cobalt-Chromium',
    color: '#C0C0C0',
    youngsModulus: 210, // GPa
    yieldStrength: 600, // MPa
    density: 8.3, // g/cm³
    maxDeformation: 0.03 // For visualization purposes
  },
  ceramic: {
    name: 'Ceramic',
    color: '#F5F5F5',
    youngsModulus: 380, // GPa
    yieldStrength: 350, // MPa
    density: 3.9, // g/cm³
    maxDeformation: 0.01 // For visualization purposes
  },
  stainless: {
    name: 'Stainless Steel',
    color: '#A9A9A9',
    youngsModulus: 200, // GPa
    yieldStrength: 500, // MPa
    density: 8.0, // g/cm³
    maxDeformation: 0.04 // For visualization purposes
  },
  oxinium: {
    name: 'Oxidized Zirconium',
    color: '#E8E8E8',
    youngsModulus: 200, // GPa
    yieldStrength: 900, // MPa
    density: 6.5, // g/cm³
    maxDeformation: 0.02 // For visualization purposes
  }
};

// Force scenarios for different activities
const forceScenarios = {
  standing: {
    name: 'Standing',
    force: 1.0, // Body weight multiplier
    description: 'Normal standing position'
  },
  walking: {
    name: 'Walking',
    force: 2.5, // Body weight multiplier
    description: 'Normal gait cycle'
  },
  stairs: {
    name: 'Climbing Stairs',
    force: 3.5, // Body weight multiplier
    description: 'Ascending stairs'
  },
  running: {
    name: 'Running',
    force: 5.0, // Body weight multiplier
    description: 'Jogging/running activity'
  },
  jumping: {
    name: 'Jumping',
    force: 8.0, // Body weight multiplier
    description: 'Landing from a jump'
  }
};

// Hip prosthesis model with stress visualization
function HipProsthesisModel({ material, forceMultiplier, patientWeight, showStressMap }) {
  const group = useRef();
  const [deformation, setDeformation] = useState(0);
  const [stressMapIntensity, setStressMapIntensity] = useState(0);

  // Create geometries for a simplified hip prosthesis
  const stemGeometry = new THREE.CylinderGeometry(0.5, 0.3, 5, 16);
  const neckGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.5, 16);
  const headGeometry = new THREE.SphereGeometry(1, 32, 32);

  // Calculate actual force in Newtons
  const actualForce = patientWeight * 9.81 * forceMultiplier; // F = m * g * multiplier

  // Material properties
  const materialProps = materialProperties[material];

  // Stress map shader material
  const stressMapMaterial = useRef();

  // Animate deformation and stress map
  useFrame(() => {
    if (group.current) {
      // Calculate deformation based on material properties and force
      // This is a simplified model for visualization purposes
      const maxDeformation = materialProps.maxDeformation;
      const stressLevel = Math.min(1.0, actualForce / (materialProps.yieldStrength * 1000));

      // Smooth animation
      setDeformation(THREE.MathUtils.lerp(deformation, maxDeformation * stressLevel, 0.05));
      setStressMapIntensity(THREE.MathUtils.lerp(stressMapIntensity, stressLevel, 0.05));

      // Apply deformation to the model (simplified)
      group.current.position.y = -deformation * 5; // Slight downward movement
      group.current.rotation.z = deformation * 0.05; // Slight rotation
    }
  });

  // Custom shader for stress visualization
  const vertexShader = `
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float stressIntensity;
    varying vec3 vPosition;

    vec3 colorMap(float stress) {
      // Green to yellow to red color mapping
      if (stress < 0.5) {
        // Green to yellow
        return mix(vec3(0.0, 0.8, 0.0), vec3(1.0, 1.0, 0.0), stress * 2.0);
      } else {
        // Yellow to red
        return mix(vec3(1.0, 1.0, 0.0), vec3(1.0, 0.0, 0.0), (stress - 0.5) * 2.0);
      }
    }

    void main() {
      // Calculate stress based on position (simplified)
      float yNormalized = (vPosition.y + 5.0) / 10.0; // Normalize y position to 0-1 range
      float stress = (1.0 - yNormalized) * stressIntensity;

      // Apply color mapping
      vec3 color = colorMap(stress);

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // Create materials
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: materialProps.color,
    metalness: material === 'ceramic' ? 0.1 : 0.8,
    roughness: material === 'ceramic' ? 0.2 : 0.4,
    side: THREE.DoubleSide // Render both sides of faces
  });

  const stressMaterial = new THREE.ShaderMaterial({
    uniforms: {
      stressIntensity: { value: stressMapIntensity }
    },
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide // Render both sides of faces
  });

  // Update stress intensity uniform
  useEffect(() => {
    if (stressMapMaterial.current && stressMapMaterial.current.material &&
        stressMapMaterial.current.material.uniforms &&
        stressMapMaterial.current.material.uniforms.stressIntensity) {
      stressMapMaterial.current.material.uniforms.stressIntensity.value = stressMapIntensity;
    }
  }, [stressMapIntensity]);

  return (
    <group ref={group} dispose={null}>
      {/* Stem part */}
      <mesh
        position={[0, -2, 0]}
        geometry={stemGeometry}
        material={showStressMap ? stressMaterial : baseMaterial}
        ref={stressMapMaterial}
        castShadow
        receiveShadow
      />
      {/* Neck part */}
      <mesh
        position={[0, 0.75, 0]}
        rotation={[0, 0, Math.PI / 6]}
        geometry={neckGeometry}
        material={showStressMap ? stressMaterial : baseMaterial}
        castShadow
        receiveShadow
      />
      {/* Head part */}
      <mesh
        position={[0.75, 1.5, 0]}
        geometry={headGeometry}
        material={showStressMap ? stressMaterial : baseMaterial}
        castShadow
        receiveShadow
      />

      {/* Ground plane for better visualization */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Force vector visualization */}
      <arrowHelper
        args={[
          new THREE.Vector3(0, -1, 0), // Direction
          new THREE.Vector3(0, 5, 0), // Origin
          forceMultiplier * 0.5, // Length
          0xff0000, // Color
          0.5, // Head length
          0.3 // Head width
        ]}
      />

      {/* Force label */}
      <Text
        position={[2, 5, 0]}
        fontSize={0.5}
        color="black"
        anchorX="left"
        anchorY="middle"
      >
        {`${Math.round(actualForce)} N`}
      </Text>

      {/* Stress scale */}
      {showStressMap && (
        <group position={[-5, 0, 0]}>
          <mesh position={[-1, 0, 0]}>
            <planeGeometry args={[0.5, 5]} />
            <shaderMaterial
              vertexShader={`
                varying vec2 vUv;
                void main() {
                  vUv = uv;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
              `}
              fragmentShader={`
                varying vec2 vUv;

                vec3 colorMap(float stress) {
                  if (stress < 0.5) {
                    return mix(vec3(0.0, 0.8, 0.0), vec3(1.0, 1.0, 0.0), stress * 2.0);
                  } else {
                    return mix(vec3(1.0, 1.0, 0.0), vec3(1.0, 0.0, 0.0), (stress - 0.5) * 2.0);
                  }
                }

                void main() {
                  float stress = 1.0 - vUv.y;
                  vec3 color = colorMap(stress);
                  gl_FragColor = vec4(color, 1.0);
                }
              `}
            />
          </mesh>

          <Text
            position={[-1, 2.7, 0]}
            fontSize={0.3}
            color="black"
            anchorX="right"
            anchorY="middle"
          >
            Low Stress
          </Text>

          <Text
            position={[-1, -2.7, 0]}
            fontSize={0.3}
            color="black"
            anchorX="right"
            anchorY="middle"
          >
            High Stress
          </Text>
        </group>
      )}
    </group>
  );
}

// Scene setup with camera and controls
function Scene({ material, forceScenario, patientWeight, showStressMap }) {
  const { camera } = useThree();

  useEffect(() => {
    // Position the camera to better view the hip prosthesis
    camera.position.set(5, 0, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.8} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
      <HipProsthesisModel
        material={material}
        forceMultiplier={forceScenarios[forceScenario].force}
        patientWeight={patientWeight}
        showStressMap={showStressMap}
      />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <Environment preset="city" />
      <ContactShadows position={[0, -5, 0]} opacity={0.5} scale={20} blur={1.5} far={5} />
      <gridHelper args={[10, 10]} />
    </>
  );
}

// Main component
const StressAnalysis = ({ patientProfile, recommendedMaterial }) => {
  const [material, setMaterial] = useState(recommendedMaterial?.id || 'titanium');
  const [forceScenario, setForceScenario] = useState('walking');
  const [patientWeight, setPatientWeight] = useState(patientProfile?.weight || 70);
  const [showStressMap, setShowStressMap] = useState(true);
  const [compareMaterial, setCompareMaterial] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [stressData, setStressData] = useState(null);
  const [materialComparisonData, setMaterialComparisonData] = useState(null);
  const [activityComparisonData, setActivityComparisonData] = useState(null);

  // Update material when recommendation changes
  useEffect(() => {
    if (recommendedMaterial?.id) {
      setMaterial(recommendedMaterial.id);
    }
  }, [recommendedMaterial]);

  // Update weight when patient profile changes
  useEffect(() => {
    if (patientProfile?.weight) {
      setPatientWeight(patientProfile.weight);
    }
  }, [patientProfile]);

  // Load stress analysis data when parameters change
  useEffect(() => {
    // Get stress data for the current material and activity
    const data = stressAnalysisService.calculateStress(material, forceScenario, patientWeight);
    setStressData(data);

    // Get material comparison data
    const materialComp = stressAnalysisService.getMaterialComparison(forceScenario);
    setMaterialComparisonData(materialComp);

    // Get activity comparison data
    const activityComp = stressAnalysisService.getActivityComparison(material);
    setActivityComparisonData(activityComp);
  }, [material, forceScenario, patientWeight]);

  // Handle material change
  const handleMaterialChange = (event) => {
    setMaterial(event.target.value);
  };

  // Handle force scenario change
  const handleForceScenarioChange = (event) => {
    setForceScenario(event.target.value);
  };

  // Handle stress map toggle
  const handleStressMapToggle = () => {
    setShowStressMap(!showStressMap);
  };

  // Handle compare material
  const handleCompareMaterial = (materialId) => {
    if (compareMaterial === materialId) {
      setCompareMaterial(null);
    } else {
      setCompareMaterial(materialId);
    }
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Calculate safety factor
  const calculateSafetyFactor = () => {
    return stressAnalysisService.calculateSafetyFactor(material, forceScenario, patientWeight);
  };

  // Render Python visualization tab
  const renderPythonVisualizationTab = () => {
    if (!stressData) return <Typography>Loading visualization data...</Typography>;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Python-Generated Stress Analysis</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                This visualization was generated using Python's scientific computing libraries to simulate stress distribution.
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="500"
              image={`data:image/png;base64,${stressData.image_2d_base64}`}
              alt="Stress analysis visualization"
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Analysis Details</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Material:</Typography>
              <Typography variant="body2" fontWeight="bold">{materialProperties[material].name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Activity:</Typography>
              <Typography variant="body2" fontWeight="bold">{forceScenarios[forceScenario].name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Applied Force:</Typography>
              <Typography variant="body2" fontWeight="bold">{stressData.actual_force.toFixed(1)} N</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Maximum Stress:</Typography>
              <Typography variant="body2" fontWeight="bold">{(stressData.max_stress * 1000).toFixed(1)} MPa</Typography>
            </Box>
          </Paper>

          <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Simulation Parameters</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="material-select-label-py">Material</InputLabel>
              <Select
                labelId="material-select-label-py"
                id="material-select-py"
                value={material}
                label="Material"
                onChange={handleMaterialChange}
              >
                {Object.keys(materialProperties).map((materialId) => (
                  <MenuItem key={materialId} value={materialId}>
                    {materialProperties[materialId].name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="force-scenario-select-label-py">Activity</InputLabel>
              <Select
                labelId="force-scenario-select-label-py"
                id="force-scenario-select-py"
                value={forceScenario}
                label="Activity"
                onChange={handleForceScenarioChange}
              >
                {Object.keys(forceScenarios).map((scenarioId) => (
                  <MenuItem key={scenarioId} value={scenarioId}>
                    {forceScenarios[scenarioId].name} ({forceScenarios[scenarioId].force}x body weight)
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mb: 2 }}>
              <Typography id="weight-slider-py" gutterBottom>
                Patient Weight: {patientWeight} kg
              </Typography>
              <Slider
                value={patientWeight}
                onChange={(_, newValue) => setPatientWeight(newValue)}
                aria-labelledby="weight-slider-py"
                valueLabelDisplay="auto"
                min={40}
                max={150}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  // Render material comparison tab
  const renderMaterialComparisonTab = () => {
    if (!materialComparisonData) return <Typography>Loading comparison data...</Typography>;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Material Comparison</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                This visualization compares how different materials respond to the same force conditions.
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="500"
              image={`data:image/png;base64,${materialComparisonData.image_base64}`}
              alt="Material comparison visualization"
            />
          </Card>
        </Grid>
      </Grid>
    );
  };

  // Render activity comparison tab
  const renderActivityComparisonTab = () => {
    if (!activityComparisonData) return <Typography>Loading comparison data...</Typography>;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Activity Comparison</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                This visualization compares how the same material responds to different activities and force conditions.
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="500"
              image={`data:image/png;base64,${activityComparisonData.image_base64}`}
              alt="Activity comparison visualization"
            />
          </Card>
        </Grid>
      </Grid>
    );
  };

  // Render 3D interactive model tab
  const render3DModelTab = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ height: 500, border: '1px solid #eee', borderRadius: 1, overflow: 'hidden' }}>
            {compareMaterial ? (
              <Grid container sx={{ height: '100%' }}>
                <Grid item xs={6} sx={{ height: '100%', borderRight: '1px solid #eee' }}>
                  <Typography variant="subtitle2" align="center" sx={{ mt: 1 }}>
                    {materialProperties[material].name}
                  </Typography>
                  <Canvas shadows="true" camera={{ position: [5, 0, 10], fov: 50 }}>
                    <Scene
                      material={material}
                      forceScenario={forceScenario}
                      patientWeight={patientWeight}
                      showStressMap={showStressMap}
                    />
                  </Canvas>
                </Grid>
                <Grid item xs={6} sx={{ height: '100%' }}>
                  <Typography variant="subtitle2" align="center" sx={{ mt: 1 }}>
                    {materialProperties[compareMaterial].name}
                  </Typography>
                  <Canvas shadows="true" camera={{ position: [5, 0, 10], fov: 50 }}>
                    <Scene
                      material={compareMaterial}
                      forceScenario={forceScenario}
                      patientWeight={patientWeight}
                      showStressMap={showStressMap}
                    />
                  </Canvas>
                </Grid>
              </Grid>
            ) : (
              <Canvas shadows="true" camera={{ position: [5, 0, 10], fov: 50 }}>
                <Scene
                  material={material}
                  forceScenario={forceScenario}
                  patientWeight={patientWeight}
                  showStressMap={showStressMap}
                />
              </Canvas>
            )}
          </Box>
        </Grid>

        {/* Safety factor information */}
        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Paper elevation={1} sx={{ p: 2, mb: 2, flexGrow: 0 }}>
            <Typography variant="subtitle1" gutterBottom>
              Safety Analysis
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Safety factor is the ratio of the material's yield strength to the maximum stress experienced.
              A higher safety factor indicates a more reliable design.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Safety Factor:</Typography>
              <Typography
                variant="h5"
                color={calculateSafetyFactor() > 2 ? 'success.main' : (calculateSafetyFactor() > 1.5 ? 'warning.main' : 'error.main')}
              >
                {calculateSafetyFactor().toFixed(2)}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Applied Force:</Typography>
              <Typography variant="body1">
                {(patientWeight * 9.81 * forceScenarios[forceScenario].force).toFixed(1)} N
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body1">Yield Strength:</Typography>
              <Typography variant="body1">
                {materialProperties[material].yieldStrength} MPa
              </Typography>
            </Box>
          </Paper>

          <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Simulation Parameters
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="material-select-label">Material</InputLabel>
              <Select
                labelId="material-select-label"
                id="material-select"
                value={material}
                label="Material"
                onChange={handleMaterialChange}
              >
                {Object.keys(materialProperties).map((materialId) => (
                  <MenuItem key={materialId} value={materialId}>
                    {materialProperties[materialId].name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="force-scenario-select-label">Activity</InputLabel>
              <Select
                labelId="force-scenario-select-label"
                id="force-scenario-select"
                value={forceScenario}
                label="Activity"
                onChange={handleForceScenarioChange}
              >
                {Object.keys(forceScenarios).map((scenarioId) => (
                  <MenuItem key={scenarioId} value={scenarioId}>
                    {forceScenarios[scenarioId].name} ({forceScenarios[scenarioId].force}x body weight)
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mb: 2 }}>
              <Typography id="weight-slider" gutterBottom>
                Patient Weight: {patientWeight} kg
              </Typography>
              <Slider
                value={patientWeight}
                onChange={(_, newValue) => setPatientWeight(newValue)}
                aria-labelledby="weight-slider"
                valueLabelDisplay="auto"
                min={40}
                max={150}
              />
            </Box>

            <Button
              variant={showStressMap ? "contained" : "outlined"}
              color="primary"
              onClick={handleStressMapToggle}
              fullWidth
              sx={{ mb: 2 }}
            >
              {showStressMap ? "Hide Stress Map" : "Show Stress Map"}
            </Button>
          </Paper>

          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Compare Materials
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Click a material to compare side-by-side with the current selection.
            </Typography>

            <Grid container spacing={1}>
              {Object.keys(materialProperties)
                .filter(id => id !== material)
                .map((materialId) => (
                  <Grid item key={materialId}>
                    <Chip
                      label={materialProperties[materialId].name}
                      onClick={() => handleCompareMaterial(materialId)}
                      color={compareMaterial === materialId ? "primary" : "default"}
                      variant={compareMaterial === materialId ? "filled" : "outlined"}
                    />
                  </Grid>
                ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Real-time 3D Stress Analysis
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This simulation shows how different prosthesis materials respond to forces during various activities.
        The stress visualization uses color mapping (green to yellow to red) to indicate areas of high stress.
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="3D Interactive Model" />
        <Tab label="Python Visualizations" />
        <Tab label="Material Comparison" />
        <Tab label="Activity Comparison" />
      </Tabs>

      {tabValue === 0 && render3DModelTab()}
      {tabValue === 1 && renderPythonVisualizationTab()}
      {tabValue === 2 && renderMaterialComparisonTab()}
      {tabValue === 3 && renderActivityComparisonTab()}

      <Typography variant="body2" color="text.secondary" sx={{ mt: 3, fontSize: '0.8rem' }}>
        Note: This simulation uses simplified physics models for educational purposes. The stress visualization is an approximation and does not represent actual clinical outcomes. In real-world scenarios, prosthesis performance depends on many additional factors including surgical technique, bone quality, and individual patient characteristics.
      </Typography>
    </Paper>
  );
};

export default StressAnalysis;
