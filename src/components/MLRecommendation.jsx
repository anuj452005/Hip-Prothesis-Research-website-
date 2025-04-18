import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Slider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Grid,
  CircularProgress,
  Chip,
  Divider,
  LinearProgress,
  Alert
} from '@mui/material';
import RecommendIcon from '@mui/icons-material/Recommend';
import BarChartIcon from '@mui/icons-material/BarChart';
import InsightsIcon from '@mui/icons-material/Insights';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import mlService from '../services/MLService';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MLRecommendation = ({ onRecommendationResult }) => {
  // Patient parameters
  const [age, setAge] = useState(60);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activityLevel, setActivityLevel] = useState(5);
  const [boneQuality, setBoneQuality] = useState('good');
  const [previousSurgery, setPreviousSurgery] = useState('no');
  const [medicalConditions, setMedicalConditions] = useState({
    osteoporosis: false,
    arthritis: false,
    diabetes: false,
    heartDisease: false,
    immunodeficiency: false
  });
  const [medications, setMedications] = useState({
    anticoagulants: false,
    immunosuppressants: false,
    corticosteroids: false,
    nsaids: false
  });
  const [smokingStatus, setSmokingStatus] = useState('non-smoker');
  const [allergies, setAllergies] = useState({
    metal: false,
    latex: false,
    adhesives: false
  });

  // Results
  const [loading, setLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [confidenceData, setConfidenceData] = useState(null);
  const [featureImportanceData, setFeatureImportanceData] = useState(null);
  const [error, setError] = useState(null);

  // Initialize ML model when component mounts
  useEffect(() => {
    const initializeModel = async () => {
      setModelLoading(true);
      try {
        await mlService.initialize();
        setModelLoading(false);
      } catch (err) {
        console.error('Error initializing ML model:', err);
        setError('Failed to initialize the ML model. Using fallback prediction method.');
        setModelLoading(false);
      }
    };

    initializeModel();
  }, []);

  // Generate recommendation based on patient parameters
  const generateRecommendation = async () => {
    setLoading(true);
    setError(null);

    try {
      // Create patient profile
      const patientProfile = {
        age,
        weight,
        height,
        activityLevel,
        boneQuality,
        previousSurgery,
        medicalConditions,
        medications,
        smokingStatus,
        allergies,
        bmi: Math.round((weight / ((height / 100) * (height / 100))) * 10) / 10
      };

      // Get prediction from ML service
      const prediction = await mlService.predict(patientProfile);

      // Set results
      setResults(prediction);

      // Pass results to parent component if callback is provided
      if (onRecommendationResult) {
        onRecommendationResult(prediction);
      }

      // Prepare chart data for confidence
      setConfidenceData({
        materials: {
          labels: prediction.materialOptions.map(m => m.name),
          datasets: [
            {
              label: 'Confidence (%)',
              data: prediction.materialOptions.map(m => m.confidence),
              backgroundColor: 'rgba(63, 81, 181, 0.6)',
              borderColor: 'rgba(63, 81, 181, 1)',
              borderWidth: 1
            }
          ]
        },
        fixations: {
          labels: prediction.fixationOptions.map(f => f.name),
          datasets: [
            {
              label: 'Confidence (%)',
              data: prediction.fixationOptions.map(f => f.confidence),
              backgroundColor: 'rgba(245, 0, 87, 0.6)',
              borderColor: 'rgba(245, 0, 87, 1)',
              borderWidth: 1
            }
          ]
        }
      });

      // Prepare feature importance data
      if (prediction.featureImportance) {
        setFeatureImportanceData({
          labels: prediction.featureImportance.map(f => f.feature),
          datasets: [
            {
              label: 'Importance',
              data: prediction.featureImportance.map(f => f.importance),
              backgroundColor: 'rgba(76, 175, 80, 0.6)',
              borderColor: 'rgba(76, 175, 80, 1)',
              borderWidth: 1
            }
          ]
        });
      }

    } catch (err) {
      console.error('Error generating recommendation:', err);
      setError('An error occurred while generating the recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Recommendation Confidence',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Confidence (%)'
        }
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Prosthesis Recommendation System
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Our machine learning model analyzes patient characteristics to recommend the most suitable hip prosthesis materials and fixation methods.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Patient Parameters
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography id="age-slider" gutterBottom>
                Age: {age} years
              </Typography>
              <Slider
                value={age}
                onChange={(_, newValue) => setAge(newValue)}
                aria-labelledby="age-slider"
                valueLabelDisplay="auto"
                min={20}
                max={100}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography id="weight-slider" gutterBottom>
                Weight: {weight} kg
              </Typography>
              <Slider
                value={weight}
                onChange={(_, newValue) => setWeight(newValue)}
                aria-labelledby="weight-slider"
                valueLabelDisplay="auto"
                min={40}
                max={150}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography id="height-slider" gutterBottom>
                Height: {height} cm
              </Typography>
              <Slider
                value={height}
                onChange={(_, newValue) => setHeight(newValue)}
                aria-labelledby="height-slider"
                valueLabelDisplay="auto"
                min={140}
                max={210}
              />
            </Box>

            <Box sx={{ mb: 1, mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                BMI: {Math.round((weight / ((height / 100) * (height / 100))) * 10) / 10} kg/m²
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography id="activity-slider" gutterBottom>
                Activity Level: {activityLevel}/10
              </Typography>
              <Slider
                value={activityLevel}
                onChange={(_, newValue) => setActivityLevel(newValue)}
                aria-labelledby="activity-slider"
                valueLabelDisplay="auto"
                min={1}
                max={10}
                marks={[
                  { value: 1, label: 'Low' },
                  { value: 5, label: 'Moderate' },
                  { value: 10, label: 'High' }
                ]}
              />
            </Box>

            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend">Bone Quality</FormLabel>
              <RadioGroup
                value={boneQuality}
                onChange={(e) => setBoneQuality(e.target.value)}
              >
                <FormControlLabel value="good" control={<Radio />} label="Good" />
                <FormControlLabel value="moderate" control={<Radio />} label="Moderate" />
                <FormControlLabel value="poor" control={<Radio />} label="Poor" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend">Previous Hip Surgery</FormLabel>
              <RadioGroup
                value={previousSurgery}
                onChange={(e) => setPreviousSurgery(e.target.value)}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend">Smoking Status</FormLabel>
              <RadioGroup
                value={smokingStatus}
                onChange={(e) => setSmokingStatus(e.target.value)}
              >
                <FormControlLabel value="non-smoker" control={<Radio />} label="Non-smoker" />
                <FormControlLabel value="former-smoker" control={<Radio />} label="Former smoker" />
                <FormControlLabel value="current-smoker" control={<Radio />} label="Current smoker" />
              </RadioGroup>
            </FormControl>

            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
              Medical Conditions
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={medicalConditions.osteoporosis}
                      onChange={(e) => setMedicalConditions(prev => ({ ...prev, osteoporosis: e.target.checked }))}
                    />
                  }
                  label="Osteoporosis"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={medicalConditions.arthritis}
                      onChange={(e) => setMedicalConditions(prev => ({ ...prev, arthritis: e.target.checked }))}
                    />
                  }
                  label="Arthritis"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={medicalConditions.diabetes}
                      onChange={(e) => setMedicalConditions(prev => ({ ...prev, diabetes: e.target.checked }))}
                    />
                  }
                  label="Diabetes"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={medicalConditions.heartDisease}
                      onChange={(e) => setMedicalConditions(prev => ({ ...prev, heartDisease: e.target.checked }))}
                    />
                  }
                  label="Heart Disease"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={medicalConditions.immunodeficiency}
                      onChange={(e) => setMedicalConditions(prev => ({ ...prev, immunodeficiency: e.target.checked }))}
                    />
                  }
                  label="Immunodeficiency"
                />
              </Grid>
            </Grid>

            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
              Current Medications
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={medications.anticoagulants}
                      onChange={(e) => setMedications(prev => ({ ...prev, anticoagulants: e.target.checked }))}
                    />
                  }
                  label="Anticoagulants"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={medications.immunosuppressants}
                      onChange={(e) => setMedications(prev => ({ ...prev, immunosuppressants: e.target.checked }))}
                    />
                  }
                  label="Immunosuppressants"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={medications.corticosteroids}
                      onChange={(e) => setMedications(prev => ({ ...prev, corticosteroids: e.target.checked }))}
                    />
                  }
                  label="Corticosteroids"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={medications.nsaids}
                      onChange={(e) => setMedications(prev => ({ ...prev, nsaids: e.target.checked }))}
                    />
                  }
                  label="NSAIDs"
                />
              </Grid>
            </Grid>

            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
              Allergies
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={allergies.metal}
                      onChange={(e) => setAllergies(prev => ({ ...prev, metal: e.target.checked }))}
                    />
                  }
                  label="Metal Allergy"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={allergies.latex}
                      onChange={(e) => setAllergies(prev => ({ ...prev, latex: e.target.checked }))}
                    />
                  }
                  label="Latex Allergy"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={allergies.adhesives}
                      onChange={(e) => setAllergies(prev => ({ ...prev, adhesives: e.target.checked }))}
                    />
                  }
                  label="Adhesives Allergy"
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              startIcon={<RecommendIcon />}
              onClick={generateRecommendation}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Generate Recommendation'}
            </Button>
          </Paper>

          {modelLoading && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>Initializing ML model...</Typography>
              <LinearProgress />
            </Box>
          )}

          {error && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Note: This recommendation system uses a TensorFlow.js machine learning model trained on anonymized patient data from hip replacement registries. Results should be considered as suggestions and not medical advice.
          </Typography>
        </Grid>

        <Grid item xs={12} md={7}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
              <CircularProgress />
              <Typography variant="body1" sx={{ ml: 2 }}>
                Analyzing patient data...
              </Typography>
            </Box>
          ) : results ? (
            <Box>
              <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Recommended Prosthesis Configuration
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Material
                    </Typography>
                    <Typography variant="h5" color="primary" gutterBottom>
                      {results.recommendedMaterial.name}
                    </Typography>
                    <Chip
                      label={`${results.recommendedMaterial.confidence}% confidence`}
                      color="primary"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Fixation Method
                    </Typography>
                    <Typography variant="h5" color="secondary" gutterBottom>
                      {results.recommendedFixation.name}
                    </Typography>
                    <Chip
                      label={`${results.recommendedFixation.confidence}% confidence`}
                      color="secondary"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Key Properties
                </Typography>

                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Durability: {Math.round(results.recommendedMaterial.properties.durability * 10)}/10
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Biocompatibility: {Math.round(results.recommendedMaterial.properties.biocompatibility * 10)}/10
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Weight: {Math.round(results.recommendedMaterial.properties.weight * 10)}/10
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Wear Resistance: {Math.round(results.recommendedMaterial.properties.wearResistance * 10)}/10
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Initial Stability: {Math.round(results.recommendedFixation.properties.initialStability * 10)}/10
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Long-term Stability: {Math.round(results.recommendedFixation.properties.longTermStability * 10)}/10
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {confidenceData && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <BarChartIcon sx={{ mr: 1 }} />
                      Confidence Analysis
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Material Options
                      </Typography>
                      <Box sx={{ height: 250 }}>
                        <Bar options={chartOptions} data={confidenceData.materials} />
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Fixation Options
                      </Typography>
                      <Box sx={{ height: 250 }}>
                        <Bar options={chartOptions} data={confidenceData.fixations} />
                      </Box>
                    </Paper>
                  </Grid>

                  {featureImportanceData && (
                    <Grid item xs={12}>
                      <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                          <InsightsIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                          Feature Importance Analysis
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          This chart shows how much each patient characteristic influenced the recommendation.
                        </Typography>
                        <Box sx={{ height: 250 }}>
                          <Bar
                            options={{
                              ...chartOptions,
                              indexAxis: 'y',
                              plugins: {
                                ...chartOptions.plugins,
                                title: {
                                  display: true,
                                  text: 'Feature Importance'
                                }
                              }
                            }}
                            data={featureImportanceData}
                          />
                        </Box>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              )}
            </Box>
          ) : (
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '400px',
              border: '1px dashed #ccc',
              borderRadius: 1,
              p: 3
            }}>
              <BarChartIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="body1" align="center" gutterBottom>
                Enter patient parameters and click "Generate Recommendation"
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary">
                Our machine learning model will analyze the data and suggest the most suitable prosthesis configuration
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Outcome prediction is now handled by OutcomePredictionPanel in ModelViewerPage */}
    </Paper>
  );
};

export default MLRecommendation;
