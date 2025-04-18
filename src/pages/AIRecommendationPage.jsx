import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Chip,
  Tabs,
  Tab
} from '@mui/material';
import { motion } from 'framer-motion';
import RecommendationChart from '../components/RecommendationChart';
import FeatureImportanceChart from '../components/FeatureImportanceChart';
import ProsthesisExplorerVisualization from '../components/ProsthesisExplorerVisualization';
import mlService from '../services/MLService';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

const AIRecommendationPage = () => {
  // State for ML model initialization
  const [modelReady, setModelReady] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);

  // Visualization state
  const [visualizationTab, setVisualizationTab] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    age: 65,
    weight: 70,
    height: 170,
    activityLevel: 5,
    boneQuality: 'moderate',
    previousSurgery: 'no',
    medicalConditions: {
      osteoporosis: false,
      arthritis: false,
      diabetes: false,
      heartDisease: false,
      immunodeficiency: false
    },
    medications: {
      anticoagulants: false,
      immunosuppressants: false,
      corticosteroids: false,
      nsaids: false
    },
    smokingStatus: 'non-smoker',
    allergies: {
      metal: false,
      latex: false,
      adhesives: false
    }
  });

  // Results state
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize ML model on component mount
  useEffect(() => {
    const initializeModel = async () => {
      try {
        setModelLoading(true);
        const success = await mlService.initialize();
        if (success) {
          setModelReady(true);
          console.log('ML model initialized successfully');
        } else {
          setError('Failed to initialize ML model. Using fallback prediction method.');
          console.error('Failed to initialize ML model');
        }
      } catch (err) {
        setError('Error initializing ML model. Using fallback prediction method.');
        console.error('Error initializing ML model:', err);
      } finally {
        setModelLoading(false);
      }
    };

    initializeModel();
  }, []);

  // Handle basic form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle slider changes
  const handleSliderChange = (name) => (e, newValue) => {
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  // Handle checkbox changes for nested objects (medical conditions, medications, allergies)
  const handleCheckboxChange = (category, name) => (e) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [name]: e.target.checked
      }
    });
  };

  // Handle radio button changes
  const handleRadioChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Process the form data into the format expected by the ML model
      const patientProfile = {
        age: parseInt(formData.age),
        weight: parseInt(formData.weight),
        height: parseInt(formData.height),
        activityLevel: parseInt(formData.activityLevel),
        boneQuality: formData.boneQuality,
        previousSurgery: formData.previousSurgery,
        medicalConditions: formData.medicalConditions,
        medications: formData.medications,
        smokingStatus: formData.smokingStatus,
        allergies: formData.allergies
      };

      // Call the ML model to get predictions
      const prediction = await mlService.predict(patientProfile);

      // Process the ML model results into the format expected by the UI
      const processedResults = {
        recommendedType: prediction.recommendedMaterial.name,
        failureRisk: Math.round(100 - prediction.recommendedMaterial.confidence),
        estimatedLongevity: prediction.recommendedMaterial.outcomes?.averageLifespan ||
                           Math.round(10 + (prediction.recommendedMaterial.confidence / 5)),
        confidenceScore: prediction.recommendedMaterial.confidence,
        alternativeOptions: prediction.materialOptions.slice(1, 3).map(material => ({
          type: material.name,
          score: material.confidence
        })),
        patientFactors: {
          age: patientProfile.age,
          activityLevel: patientProfile.activityLevel,
          boneQuality: patientProfile.boneQuality,
          medicalConsiderations: Object.values(patientProfile.medicalConditions).some(Boolean)
        },
        featureImportance: prediction.featureImportance,
        fixationMethod: prediction.recommendedFixation.name,
        fixationConfidence: prediction.recommendedFixation.confidence,
        alternativeFixations: prediction.fixationOptions.slice(1, 3).map(fixation => ({
          type: fixation.name,
          score: fixation.confidence
        }))
      };

      setResults(processedResults);
    } catch (err) {
      console.error('Error making prediction:', err);
      setError("An error occurred while processing your data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form and results
  const handleReset = () => {
    setFormData({
      age: 65,
      weight: 70,
      height: 170,
      activityLevel: 5,
      boneQuality: 'moderate',
      previousSurgery: 'no',
      medicalConditions: {
        osteoporosis: false,
        arthritis: false,
        diabetes: false,
        heartDisease: false,
        immunodeficiency: false
      },
      medications: {
        anticoagulants: false,
        immunosuppressants: false,
        corticosteroids: false,
        nsaids: false
      },
      smokingStatus: 'non-smoker',
      allergies: {
        metal: false,
        latex: false,
        adhesives: false
      }
    });
    setResults(null);
    setError(null);
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
            AI Prosthesis Recommendation
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
            Enter patient information to receive AI-powered recommendations for the most suitable hip prosthesis type
          </Typography>
          <Divider sx={{ width: '120px', mx: 'auto', my: 3, borderColor: 'primary.main', borderWidth: 3, borderRadius: 2 }} />
        </Box>

        <Grid container spacing={4}>
          {/* Input Form */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              component="form"
              onSubmit={handleSubmit}
              sx={{
                p: 4,
                borderRadius: 4,
                height: '100%'
              }}
            >
              <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                Patient Information
              </Typography>

              <Grid container spacing={3}>
                {/* Basic Patient Information */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                    Basic Information
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { min: 18, max: 100 } }}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Weight (kg)"
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { min: 30, max: 200 } }}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Height (cm)"
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { min: 100, max: 250 } }}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography gutterBottom>Activity Level (1-10)</Typography>
                  <Slider
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleSliderChange('activityLevel')}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                    sx={{ color: 'primary.main' }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">Sedentary</Typography>
                    <Typography variant="caption" color="text.secondary">Very Active</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Bone Quality</InputLabel>
                    <Select
                      name="boneQuality"
                      value={formData.boneQuality}
                      onChange={handleInputChange}
                      label="Bone Quality"
                    >
                      <MenuItem value="good">Good</MenuItem>
                      <MenuItem value="moderate">Moderate</MenuItem>
                      <MenuItem value="poor">Poor</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Previous Hip Surgery</InputLabel>
                    <Select
                      name="previousSurgery"
                      value={formData.previousSurgery}
                      onChange={handleInputChange}
                      label="Previous Hip Surgery"
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Medical Conditions */}
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                    Medical Conditions
                  </Typography>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.medicalConditions.osteoporosis}
                          onChange={handleCheckboxChange('medicalConditions', 'osteoporosis')}
                        />
                      }
                      label="Osteoporosis"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.medicalConditions.arthritis}
                          onChange={handleCheckboxChange('medicalConditions', 'arthritis')}
                        />
                      }
                      label="Arthritis"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.medicalConditions.diabetes}
                          onChange={handleCheckboxChange('medicalConditions', 'diabetes')}
                        />
                      }
                      label="Diabetes"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.medicalConditions.heartDisease}
                          onChange={handleCheckboxChange('medicalConditions', 'heartDisease')}
                        />
                      }
                      label="Heart Disease"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.medicalConditions.immunodeficiency}
                          onChange={handleCheckboxChange('medicalConditions', 'immunodeficiency')}
                        />
                      }
                      label="Immunodeficiency"
                    />
                  </FormGroup>
                </Grid>

                {/* Medications */}
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                    Current Medications
                  </Typography>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.medications.anticoagulants}
                          onChange={handleCheckboxChange('medications', 'anticoagulants')}
                        />
                      }
                      label="Anticoagulants"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.medications.immunosuppressants}
                          onChange={handleCheckboxChange('medications', 'immunosuppressants')}
                        />
                      }
                      label="Immunosuppressants"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.medications.corticosteroids}
                          onChange={handleCheckboxChange('medications', 'corticosteroids')}
                        />
                      }
                      label="Corticosteroids"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.medications.nsaids}
                          onChange={handleCheckboxChange('medications', 'nsaids')}
                        />
                      }
                      label="NSAIDs"
                    />
                  </FormGroup>
                </Grid>

                {/* Smoking Status */}
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                    Smoking Status
                  </Typography>
                  <FormControl component="fieldset">
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.smokingStatus === 'non-smoker'}
                            onChange={() => handleRadioChange('smokingStatus', 'non-smoker')}
                          />
                        }
                        label="Non-Smoker"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.smokingStatus === 'former-smoker'}
                            onChange={() => handleRadioChange('smokingStatus', 'former-smoker')}
                          />
                        }
                        label="Former Smoker"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.smokingStatus === 'current-smoker'}
                            onChange={() => handleRadioChange('smokingStatus', 'current-smoker')}
                          />
                        }
                        label="Current Smoker"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>

                {/* Allergies */}
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                    Allergies
                  </Typography>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.allergies.metal}
                          onChange={handleCheckboxChange('allergies', 'metal')}
                        />
                      }
                      label="Metal Allergy"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.allergies.latex}
                          onChange={handleCheckboxChange('allergies', 'latex')}
                        />
                      }
                      label="Latex Allergy"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.allergies.adhesives}
                          onChange={handleCheckboxChange('allergies', 'adhesives')}
                        />
                      }
                      label="Adhesives Allergy"
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleReset}
                      sx={{ borderRadius: 2 }}
                    >
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      sx={{
                        borderRadius: 2,
                        px: 4
                      }}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Generate Recommendation'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Results Section */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                AI Recommendation Results
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {loading && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                  <CircularProgress size={60} />
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Analyzing patient data...
                  </Typography>
                </Box>
              )}

              {modelLoading && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                  <CircularProgress size={60} />
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Initializing AI model...
                  </Typography>
                </Box>
              )}

              {!modelLoading && !loading && !results && !error && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                  <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                    Enter patient information and click "Generate Recommendation" to receive AI-powered prosthesis recommendations.
                  </Typography>
                </Box>
              )}

              {!loading && results && (
                <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Recommendation generated using TensorFlow.js machine learning model trained on hip prosthesis data.
                  </Alert>

                  {/* Tabs for different result views */}
                  <Box sx={{ mb: 3 }}>
                    <Tabs
                      value={visualizationTab}
                      onChange={(e, newValue) => setVisualizationTab(newValue)}
                      variant="fullWidth"
                      sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        '& .MuiTab-root': { fontWeight: 600 }
                      }}
                    >
                      <Tab icon={<BarChartIcon />} iconPosition="start" label="Summary" />
                      <Tab icon={<DonutLargeIcon />} iconPosition="start" label="Scientific Analysis" />
                      <Tab icon={<TimelineIcon />} iconPosition="start" label="Interactive Explorer" />
                    </Tabs>
                  </Box>

                  {/* Summary Tab */}
                  {visualizationTab === 0 && (
                    <Box>
                      <Card sx={{ mb: 3, borderLeft: '4px solid #2563eb', borderRadius: 2 }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Recommended Material
                          </Typography>
                          <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                            {results.recommendedType}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Confidence Score: {results.confidenceScore}%
                          </Typography>
                        </CardContent>
                      </Card>

                      <Card sx={{ mb: 3, borderLeft: '4px solid #8b5cf6', borderRadius: 2 }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Recommended Fixation Method
                          </Typography>
                          <Typography variant="h4" color="secondary" sx={{ fontWeight: 700 }}>
                            {results.fixationMethod}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Confidence Score: {results.fixationConfidence}%
                          </Typography>
                        </CardContent>
                      </Card>

                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={6}>
                          <Card sx={{ height: '100%', borderRadius: 2 }}>
                            <CardContent>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Estimated Longevity
                              </Typography>
                              <Typography variant="h5" color="primary">
                                {results.estimatedLongevity} years
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid item xs={6}>
                          <Card sx={{ height: '100%', borderRadius: 2 }}>
                            <CardContent>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Failure Risk
                              </Typography>
                              <Typography
                                variant="h5"
                                color={results.failureRisk > 20 ? 'error' : results.failureRisk > 10 ? 'warning.main' : 'success.main'}
                              >
                                {results.failureRisk}%
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>

                      <Typography variant="h6" gutterBottom>
                        Patient Profile Summary
                      </Typography>
                      <Box sx={{ pl: 2, borderLeft: '2px solid #e0e0e0', mb: 3 }}>
                        <Typography variant="body2">• Age: {results.patientFactors.age} years</Typography>
                        <Typography variant="body2">• Activity Level: {formData.activityLevel}/10</Typography>
                        <Typography variant="body2">• Bone Quality: {formData.boneQuality}</Typography>
                        {results.patientFactors.medicalConsiderations && (
                          <Typography variant="body2">• Medical Considerations: Yes</Typography>
                        )}
                      </Box>
                    </Box>
                  )}

                  {/* Scientific Analysis Tab */}
                  {visualizationTab === 1 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Material Options Analysis
                      </Typography>

                      <Box sx={{ mb: 3 }}>
                        <RecommendationChart
                          mainOption={{
                            name: results.recommendedType,
                            score: results.confidenceScore
                          }}
                          alternatives={results.alternativeOptions}
                        />
                      </Box>

                      <Typography variant="h6" gutterBottom>
                        Fixation Method Analysis
                      </Typography>

                      <Box sx={{ mb: 3 }}>
                        <RecommendationChart
                          mainOption={{
                            name: results.fixationMethod,
                            score: results.fixationConfidence
                          }}
                          alternatives={results.alternativeFixations}
                        />
                      </Box>

                      {results.featureImportance && results.featureImportance.length > 0 && (
                        <Box sx={{ mt: 3, mb: 3 }}>
                          <FeatureImportanceChart features={results.featureImportance.slice(0, 7)} />
                        </Box>
                      )}
                    </Box>
                  )}

                  {/* Interactive Explorer Tab */}
                  {visualizationTab === 2 && (
                    <Box>
                      <ProsthesisExplorerVisualization
                        results={results}
                        isLoading={loading}
                      />
                    </Box>
                  )}
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, p: 3, bgcolor: 'rgba(63,81,181,0.05)', borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom color="primary">
            About This Tool
          </Typography>
          <Typography variant="body2" paragraph>
            This AI recommendation tool uses TensorFlow.js to run a neural network model directly in your browser. The model has been trained on a dataset of hip prosthesis cases to provide personalized recommendations based on patient-specific factors including age, bone quality, activity level, medical conditions, and more.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>How it works:</strong> The AI model uses two neural networks - one for material selection and one for fixation method recommendation. Each network analyzes over 20 patient parameters to determine the most suitable options with confidence scores. The model also calculates feature importance to explain which factors most influenced the recommendation.
          </Typography>
          <Typography variant="body2" paragraph sx={{ color: 'error.main' }}>
            <strong>Data Privacy Notice:</strong> All patient data entered in this form is processed locally in your browser and is never stored on any server. The TensorFlow.js model runs entirely client-side, ensuring your personal health information remains private and is not shared with any third parties.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Note:</strong> This tool is for educational purposes only and should not replace professional medical advice. Always consult with healthcare providers for medical decisions.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AIRecommendationPage;
