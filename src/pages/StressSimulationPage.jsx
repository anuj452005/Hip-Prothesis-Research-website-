import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Card,
  CardContent,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  LinearProgress,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';

// This would be replaced with actual Three.js implementation
const StressVisualization = ({ prosthesisType, activityType, patientWeight, loading }) => {
  const canvasRef = useRef(null);

  // Simulate drawing the stress visualization
  useEffect(() => {
    if (loading || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a simple visualization based on the parameters
    // This is a placeholder - in a real implementation, this would use Three.js

    // Background
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw prosthesis outline
    ctx.strokeStyle = '#3f51b5';
    ctx.lineWidth = 2;

    // Different shapes based on prosthesis type
    if (prosthesisType === 'total') {
      // Total hip replacement shape
      ctx.beginPath();
      ctx.moveTo(150, 50);
      ctx.lineTo(150, 250);
      ctx.lineTo(180, 300);
      ctx.lineTo(220, 300);
      ctx.lineTo(250, 250);
      ctx.lineTo(250, 150);
      ctx.arc(200, 150, 50, 0, Math.PI, true);
      ctx.closePath();
      ctx.stroke();

      // Socket
      ctx.beginPath();
      ctx.arc(200, 150, 60, 0, Math.PI);
      ctx.stroke();
    } else if (prosthesisType === 'partial') {
      // Partial hip replacement shape
      ctx.beginPath();
      ctx.moveTo(150, 100);
      ctx.lineTo(150, 250);
      ctx.lineTo(180, 300);
      ctx.lineTo(220, 300);
      ctx.lineTo(250, 250);
      ctx.lineTo(250, 100);
      ctx.arc(200, 100, 50, 0, Math.PI, true);
      ctx.closePath();
      ctx.stroke();
    } else {
      // Hip resurfacing shape
      ctx.beginPath();
      ctx.moveTo(150, 150);
      ctx.lineTo(150, 250);
      ctx.lineTo(250, 250);
      ctx.lineTo(250, 150);
      ctx.closePath();
      ctx.stroke();

      // Resurfacing cap
      ctx.beginPath();
      ctx.arc(200, 150, 50, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Calculate stress factors
    let stressFactor = 1;
    if (activityType === 'walking') stressFactor = 1;
    else if (activityType === 'stairs') stressFactor = 1.5;
    else if (activityType === 'running') stressFactor = 2;
    else if (activityType === 'jumping') stressFactor = 3;

    // Adjust for weight
    stressFactor *= (patientWeight / 70);

    // Draw stress points with colors
    const stressPoints = [
      { x: 200, y: 150, factor: 1.0 }, // Head/neck junction
      { x: 200, y: 200, factor: 0.8 }, // Upper stem
      { x: 200, y: 250, factor: 0.6 }, // Mid stem
      { x: 200, y: 300, factor: 0.4 }  // Lower stem
    ];

    stressPoints.forEach(point => {
      const stress = point.factor * stressFactor;

      // Determine color based on stress level
      let color;
      if (stress < 1) color = 'rgba(0, 255, 0, 0.5)'; // Green - safe
      else if (stress < 2) color = 'rgba(255, 255, 0, 0.5)'; // Yellow - caution
      else color = 'rgba(255, 0, 0, 0.5)'; // Red - high stress

      // Draw stress indicator
      ctx.beginPath();
      ctx.arc(point.x, point.y, 20 * stress, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    });

    // Add legend
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    ctx.fillText('Stress Levels:', 20, 30);

    ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
    ctx.fillRect(20, 40, 20, 20);
    ctx.fillStyle = '#000';
    ctx.fillText('Low', 50, 55);

    ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
    ctx.fillRect(20, 70, 20, 20);
    ctx.fillStyle = '#000';
    ctx.fillText('Medium', 50, 85);

    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(20, 100, 20, 20);
    ctx.fillStyle = '#000';
    ctx.fillText('High', 50, 115);

  }, [prosthesisType, activityType, patientWeight, loading]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: 'center' }}>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{ maxWidth: '100%', height: 'auto', border: '1px solid #e0e0e0' }}
      />
    </Box>
  );
};

const StressSimulationPage = () => {
  // Simulation parameters
  const [prosthesisType, setProsthesisType] = useState('total');
  const [activityType, setActivityType] = useState('walking');
  const [patientWeight, setPatientWeight] = useState(70);
  const [loading, setLoading] = useState(false);
  const [stressData, setStressData] = useState(null);

  // Handle prosthesis type change
  const handleProsthesisChange = (event) => {
    setProsthesisType(event.target.value);
  };

  // Handle activity type change
  const handleActivityChange = (event, newValue) => {
    if (newValue !== null) {
      setActivityType(newValue);
    }
  };

  // Handle weight slider change
  const handleWeightChange = (event, newValue) => {
    setPatientWeight(newValue);
  };

  // Run simulation
  const runSimulation = () => {
    setLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      // Generate mock stress data
      const mockStressData = generateMockStressData(prosthesisType, activityType, patientWeight);
      setStressData(mockStressData);
      setLoading(false);
    }, 1500);
  };

  // Generate mock stress data
  const generateMockStressData = (prosthesisType, activityType, weight) => {
    // Activity stress multipliers
    const activityMultipliers = {
      walking: 1,
      stairs: 1.5,
      running: 2.5,
      jumping: 3.5
    };

    // Prosthesis type base values
    const prosthesisBaseValues = {
      total: { maxStress: 15, fatigueRate: 0.8 },
      partial: { maxStress: 18, fatigueRate: 1.0 },
      resurfacing: { maxStress: 20, fatigueRate: 1.2 }
    };

    // Calculate stress values
    const baseValues = prosthesisBaseValues[prosthesisType];
    const activityMultiplier = activityMultipliers[activityType];
    const weightFactor = weight / 70; // Normalize to 70kg

    const maxStress = baseValues.maxStress * activityMultiplier * weightFactor;
    const fatigueRate = baseValues.fatigueRate * activityMultiplier * weightFactor;

    // Stress distribution across components
    const components = [
      { name: 'Femoral Head', stress: maxStress * (0.8 + Math.random() * 0.4) },
      { name: 'Neck Junction', stress: maxStress * (0.9 + Math.random() * 0.3) },
      { name: 'Upper Stem', stress: maxStress * (0.7 + Math.random() * 0.3) },
      { name: 'Lower Stem', stress: maxStress * (0.5 + Math.random() * 0.2) },
      { name: 'Acetabular Cup', stress: maxStress * (0.6 + Math.random() * 0.3) }
    ];

    // Sort by stress level (highest first)
    components.sort((a, b) => b.stress - a.stress);

    return {
      maxStress: Math.round(maxStress * 10) / 10,
      fatigueRate: Math.round(fatigueRate * 100) / 100,
      components,
      riskLevel: maxStress > 30 ? 'High' : maxStress > 20 ? 'Medium' : 'Low',
      estimatedCycles: Math.round(1000000 / fatigueRate)
    };
  };

  return (
    <Box sx={{
      background: 'linear-gradient(180deg, rgba(63,81,181,0.05) 0%, rgba(255,255,255,0) 100%)',
      pt: 6,
      pb: 8
    }}>
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ mb: 6, textAlign: 'center' }}
        >
          <Typography
            variant="h2"
            component="h1"
            color="primary"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textShadow: '0px 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            Stress & Fatigue Simulation
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 3,
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.6
            }}
          >
            Visualize mechanical stress distribution and fatigue analysis on different hip prosthesis designs
          </Typography>
          <Divider sx={{ width: '120px', mx: 'auto', my: 3, borderColor: 'primary.main', borderWidth: 3, borderRadius: 2 }} />
        </Box>

        <Grid container spacing={4}>
          {/* Control Panel */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 4,
                height: '100%'
              }}
            >
              <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                Simulation Parameters
              </Typography>

              <Box sx={{ mb: 4 }}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Prosthesis Type</InputLabel>
                  <Select
                    value={prosthesisType}
                    onChange={handleProsthesisChange}
                    label="Prosthesis Type"
                  >
                    <MenuItem value="total">Total Hip Replacement</MenuItem>
                    <MenuItem value="partial">Partial Hip Replacement</MenuItem>
                    <MenuItem value="resurfacing">Hip Resurfacing</MenuItem>
                  </Select>
                </FormControl>

                <Typography gutterBottom>Activity Type</Typography>
                <ToggleButtonGroup
                  value={activityType}
                  exclusive
                  onChange={handleActivityChange}
                  aria-label="activity type"
                  fullWidth
                  sx={{ mb: 3 }}
                >
                  <ToggleButton value="walking" aria-label="walking">
                    Walking
                  </ToggleButton>
                  <ToggleButton value="stairs" aria-label="stairs">
                    Stairs
                  </ToggleButton>
                  <ToggleButton value="running" aria-label="running">
                    Running
                  </ToggleButton>
                  <ToggleButton value="jumping" aria-label="jumping">
                    Jumping
                  </ToggleButton>
                </ToggleButtonGroup>

                <Typography gutterBottom>Patient Weight (kg)</Typography>
                <Slider
                  value={patientWeight}
                  onChange={handleWeightChange}
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={40}
                  max={120}
                  sx={{ color: 'primary.main', mb: 3 }}
                />
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={runSimulation}
                disabled={loading}
                sx={{
                  borderRadius: 2,
                  py: 1.5
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Run Simulation'}
              </Button>

              {stressData && (
                <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #e0e0e0' }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Simulation Results
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Maximum Stress:</strong> {stressData.maxStress} MPa
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Fatigue Rate:</strong> {stressData.fatigueRate} μm/cycle
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Risk Level:</strong>{' '}
                    <Box component="span" sx={{
                      color: stressData.riskLevel === 'High' ? 'error.main' :
                             stressData.riskLevel === 'Medium' ? 'warning.main' :
                             'success.main',
                      fontWeight: 'bold'
                    }}>
                      {stressData.riskLevel}
                    </Box>
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 3 }}>
                    <strong>Estimated Cycles:</strong> {stressData.estimatedCycles.toLocaleString()}
                  </Typography>

                  <Typography variant="subtitle2" gutterBottom>
                    Stress by Component
                  </Typography>

                  {stressData.components.map((component, index) => (
                    <Box key={index} sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">{component.name}</Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: component.stress > 30 ? 'error.main' :
                                  component.stress > 20 ? 'warning.main' :
                                  'success.main'
                          }}
                        >
                          {Math.round(component.stress * 10) / 10} MPa
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(100, (component.stress / 40) * 100)}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: 'rgba(0,0,0,0.05)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: component.stress > 30 ? 'error.main' :
                                            component.stress > 20 ? 'warning.main' :
                                            'success.main',
                            borderRadius: 3
                          }
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Visualization */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 4,
                height: '100%'
              }}
            >
              <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                Stress Visualization
              </Typography>

              <Box sx={{ mb: 4 }}>
                <StressVisualization
                  prosthesisType={prosthesisType}
                  activityType={activityType}
                  patientWeight={patientWeight}
                  loading={loading}
                />
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle2" gutterBottom color="primary">
                  Interpretation Guide
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Card sx={{ bgcolor: 'rgba(76,175,80,0.1)', borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle2" color="success.main" gutterBottom>
                          Green Zones
                        </Typography>
                        <Typography variant="body2">
                          Low stress areas. These regions are well within safe mechanical limits.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Card sx={{ bgcolor: 'rgba(255,193,7,0.1)', borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle2" color="warning.main" gutterBottom>
                          Yellow Zones
                        </Typography>
                        <Typography variant="body2">
                          Moderate stress. These areas may experience fatigue over extended use.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Card sx={{ bgcolor: 'rgba(244,67,54,0.1)', borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle2" color="error.main" gutterBottom>
                          Red Zones
                        </Typography>
                        <Typography variant="body2">
                          High stress concentration. These regions are at risk of mechanical failure.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, p: 3, bgcolor: 'rgba(63,81,181,0.05)', borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom color="primary">
            About This Simulation
          </Typography>
          <Typography variant="body2" paragraph>
            This stress and fatigue simulation tool provides a simplified visualization of mechanical stresses on different hip prosthesis designs under various activities and patient conditions.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Note:</strong> This is a simplified educational model. In real-world applications, finite element analysis (FEA) and more complex biomechanical models would be used for accurate stress predictions.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default StressSimulationPage;
