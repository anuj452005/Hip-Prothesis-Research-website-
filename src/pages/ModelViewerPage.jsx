import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Tabs, Tab, Divider } from '@mui/material';
import InteractiveModel from '../components/InteractiveModel';
import InteractiveMaterialComparison from '../components/InteractiveMaterialComparison';
import MLRecommendation from '../components/MLRecommendation';
import StressAnalysis from '../components/StressAnalysis';
import OutcomePredictionPanel from '../components/OutcomePredictionPanel';

const ModelViewerPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [patientProfile, setPatientProfile] = useState(null);
  const [recommendedMaterial, setRecommendedMaterial] = useState(null);
  const [recommendedFixation, setRecommendedFixation] = useState(null);
  const [outcomeData, setOutcomeData] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Callback to receive recommendation data from MLRecommendation
  const handleRecommendationResult = (results) => {
    if (results) {
      setPatientProfile(results.patientProfile);
      setRecommendedMaterial(results.recommendedMaterial);
      setRecommendedFixation(results.recommendedFixation);

      // Calculate outcome data based on the recommendation
      const recoveryTime = calculateRecoveryTime(results);
      const complicationRisk = calculateComplicationRisk(results);
      const prosthesisLifespan = calculateProsthesisLifespan(results);

      setOutcomeData({
        recoveryTime,
        complicationRisk,
        prosthesisLifespan
      });
    }
  };

  // Helper functions to calculate outcome metrics
  const calculateRecoveryTime = (results) => {
    // Base recovery time based on material
    let baseTime = 8; // weeks

    if (results.recommendedMaterial.name === 'Titanium Alloy') baseTime = 7;
    if (results.recommendedMaterial.name === 'Ceramic') baseTime = 6;
    if (results.recommendedMaterial.name === 'Oxidized Zirconium') baseTime = 6;

    // Adjust for patient factors
    const age = results.patientProfile.age;
    if (age > 75) baseTime += 2;
    else if (age > 60) baseTime += 1;
    else if (age < 50) baseTime -= 1;

    // Adjust for activity level
    const activityLevel = results.patientProfile.activityLevel;
    if (activityLevel > 7) baseTime -= 1;
    else if (activityLevel < 4) baseTime += 1;

    // Adjust for bone quality
    if (results.patientProfile.boneQuality === 'poor') baseTime += 2;

    // Adjust for medical conditions
    if (results.patientProfile.medicalConditions?.diabetes) baseTime += 1;
    if (results.patientProfile.medicalConditions?.osteoporosis) baseTime += 1;

    // Ensure reasonable range
    return Math.max(4, Math.min(14, baseTime));
  };

  const calculateComplicationRisk = (results) => {
    // Base risk based on material
    let baseRisk = 5; // percentage

    if (results.recommendedMaterial.name === 'Titanium Alloy') baseRisk = 4;
    if (results.recommendedMaterial.name === 'Ceramic') baseRisk = 3;
    if (results.recommendedMaterial.name === 'Oxidized Zirconium') baseRisk = 3;

    // Adjust for patient factors
    const age = results.patientProfile.age;
    if (age > 75) baseRisk += 3;
    else if (age > 60) baseRisk += 1;

    // Adjust for smoking
    if (results.patientProfile.smokingStatus === 'current-smoker') baseRisk += 4;
    else if (results.patientProfile.smokingStatus === 'former-smoker') baseRisk += 1;

    // Adjust for medical conditions
    if (results.patientProfile.medicalConditions?.diabetes) baseRisk += 2;
    if (results.patientProfile.medicalConditions?.immunodeficiency) baseRisk += 3;
    if (results.patientProfile.medicalConditions?.heartDisease) baseRisk += 1;

    // Adjust for medications
    if (results.patientProfile.medications?.anticoagulants) baseRisk += 1;
    if (results.patientProfile.medications?.immunosuppressants) baseRisk += 2;

    // Ensure reasonable range
    return Math.max(1, Math.min(15, baseRisk));
  };

  const calculateProsthesisLifespan = (results) => {
    // Base lifespan based on material
    let baseLifespan = 15; // years

    if (results.recommendedMaterial.name === 'Titanium Alloy') baseLifespan = 18;
    if (results.recommendedMaterial.name === 'Ceramic') baseLifespan = 20;
    if (results.recommendedMaterial.name === 'Oxidized Zirconium') baseLifespan = 22;
    if (results.recommendedMaterial.name === 'Cobalt-Chromium') baseLifespan = 17;

    // Adjust for patient factors
    const age = results.patientProfile.age;
    if (age > 75) baseLifespan += 2; // Less wear due to lower activity
    else if (age < 50) baseLifespan -= 3; // More wear due to higher activity and longer life expectancy

    // Adjust for activity level
    const activityLevel = results.patientProfile.activityLevel;
    if (activityLevel > 7) baseLifespan -= 3;
    else if (activityLevel < 4) baseLifespan += 2;

    // Adjust for weight/BMI
    const bmi = results.patientProfile.bmi;
    if (bmi > 30) baseLifespan -= 2;
    else if (bmi > 25) baseLifespan -= 1;

    // Ensure reasonable range
    return Math.max(10, Math.min(25, baseLifespan));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Interactive Hip Prosthesis Explorer
      </Typography>

      <Typography variant="body1" paragraph>
        Explore the hip prosthesis in 3D, learn about different materials, and get personalized recommendations based on your profile.
      </Typography>

      <Paper elevation={2} sx={{ mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="3D Model" />
          <Tab label="Materials Comparison" />
          <Tab label="Recommendation System" />
          <Tab label="Stress Analysis" />
        </Tabs>

        {/* 3D Model Tab */}
        <Box sx={{ p: 0, display: activeTab === 0 ? 'block' : 'none' }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Interactive 3D Hip Prosthesis Model
            </Typography>
            <Typography variant="body1" paragraph>
              Rotate, zoom, and explore the components of a hip prosthesis. Click on hotspots to learn about each part.
            </Typography>
          </Box>

          {/* Sketchfab model */}
          <Box sx={{ display: 'block' }}>
            <div className="sketchfab-embed-wrapper">
              <iframe
                title="Hip Replacement"
                width="100%"
                height="500"
                frameBorder="0"
                allowFullScreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                src="https://sketchfab.com/models/a314ca9bf00142aab0a42aeaace8e8af/embed?autostart=1"
              ></iframe>
              <p style={{fontSize: "13px", fontWeight: "normal", margin: "5px", color: "#4A4A4A"}}>
                <a href="https://sketchfab.com/3d-models/hip-replacement-a314ca9bf00142aab0a42aeaace8e8af?utm_medium=embed&utm_campaign=share-popup&utm_content=a314ca9bf00142aab0a42aeaace8e8af" target="_blank" rel="nofollow" style={{fontWeight: "bold", color: "#1CAAD9"}}>
                  Hip Replacement
                </a> by <a href="https://sketchfab.com/SamSpaeth?utm_medium=embed&utm_campaign=share-popup&utm_content=a314ca9bf00142aab0a42aeaace8e8af" target="_blank" rel="nofollow" style={{fontWeight: "bold", color: "#1CAAD9"}}>
                  Shlomo Sam Spaeth
                </a> on <a href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=a314ca9bf00142aab0a42aeaace8e8af" target="_blank" rel="nofollow" style={{fontWeight: "bold", color: "#1CAAD9"}}>
                  Sketchfab
                </a>
              </p>
            </div>
          </Box>

          {/* Interactive Three.js Model */}
          <InteractiveModel />

          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Key Components
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Acetabular Cup
                </Typography>
                <Typography variant="body2">
                  The socket component that replaces the acetabulum. Usually made of metal with a plastic, ceramic or metal liner. It's designed to mimic the natural socket of the hip joint and provide a smooth articulating surface.
                </Typography>
              </Paper>

              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Femoral Head
                </Typography>
                <Typography variant="body2">
                  The ball component that replaces the head of the femur. Can be made of metal or ceramic materials. This spherical component articulates with the liner of the acetabular cup to create a smooth, low-friction joint.
                </Typography>
              </Paper>

              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Liner
                </Typography>
                <Typography variant="body2">
                  Fits inside the acetabular cup and provides a smooth surface for the femoral head to articulate against. Commonly made of polyethylene, ceramic, or metal, the liner is crucial for reducing friction and wear in the artificial joint.
                </Typography>
              </Paper>

              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Femoral Stem
                </Typography>
                <Typography variant="body2">
                  Inserted into the femur to support the femoral head. Usually made of titanium or cobalt-chromium alloys. The stem is designed to integrate with the bone, providing stability and transferring loads from the artificial joint to the femur.
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Box>

        {/* Materials Comparison Tab */}
        <Box sx={{ p: 3, display: activeTab === 1 ? 'block' : 'none' }}>
          <InteractiveMaterialComparison />
        </Box>

        {/* Recommendation System Tab */}
        <Box sx={{ p: 3, display: activeTab === 2 ? 'block' : 'none' }}>
          <MLRecommendation onRecommendationResult={handleRecommendationResult} />

          {patientProfile && recommendedMaterial && recommendedFixation && outcomeData && (
            <OutcomePredictionPanel
              patientProfile={patientProfile}
              recommendedMaterial={recommendedMaterial.name}
              recommendedFixation={recommendedFixation.name}
              outcomes={outcomeData}
            />
          )}
        </Box>

        {/* Stress Analysis Tab */}
        <Box sx={{ p: 3, display: activeTab === 3 ? 'block' : 'none' }}>
          <StressAnalysis patientProfile={patientProfile} recommendedMaterial={recommendedMaterial} />
        </Box>
      </Paper>
    </Container>
  );
};

export default ModelViewerPage;
