import React, { useState } from 'react';
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
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  TextField,
  CircularProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ReportGeneratorPage = () => {
  // State for report configuration
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  // Report configuration state
  const [reportConfig, setReportConfig] = useState({
    patientInfo: {
      age: '',
      gender: '',
      diagnosis: '',
      activityLevel: ''
    },
    prosthesisType: '',
    includeSections: {
      patientProfile: true,
      prosthesisDetails: true,
      materialAnalysis: true,
      stressAnalysis: true,
      costAnalysis: false,
      environmentalImpact: false,
      references: true
    },
    additionalNotes: ''
  });

  // Steps for the report generation process
  const steps = [
    'Patient Information',
    'Report Content',
    'Generate Report'
  ];

  // Handle input changes for patient info
  const handlePatientInfoChange = (e) => {
    const { name, value } = e.target;
    setReportConfig({
      ...reportConfig,
      patientInfo: {
        ...reportConfig.patientInfo,
        [name]: value
      }
    });
  };

  // Handle prosthesis type change
  const handleProsthesisTypeChange = (e) => {
    setReportConfig({
      ...reportConfig,
      prosthesisType: e.target.value
    });
  };

  // Handle section inclusion toggles
  const handleSectionToggle = (section) => (e) => {
    setReportConfig({
      ...reportConfig,
      includeSections: {
        ...reportConfig.includeSections,
        [section]: e.target.checked
      }
    });
  };

  // Handle additional notes change
  const handleNotesChange = (e) => {
    setReportConfig({
      ...reportConfig,
      additionalNotes: e.target.value
    });
  };

  // Handle next step
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Handle report generation
  const handleGenerateReport = () => {
    setLoading(true);

    // Simulate report generation delay
    setTimeout(() => {
      setLoading(false);
      setReportGenerated(true);
    }, 3000);
  };

  // Reset the form
  const handleReset = () => {
    setActiveStep(0);
    setReportGenerated(false);
    setReportConfig({
      patientInfo: {
        age: '',
        gender: '',
        diagnosis: '',
        activityLevel: ''
      },
      prosthesisType: '',
      includeSections: {
        patientProfile: true,
        prosthesisDetails: true,
        materialAnalysis: true,
        stressAnalysis: true,
        costAnalysis: false,
        environmentalImpact: false,
        references: true
      },
      additionalNotes: ''
    });
  };

  // Render step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Patient Information
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Enter basic patient information to personalize the report.
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={reportConfig.patientInfo.age}
                  onChange={handlePatientInfoChange}
                  InputProps={{ inputProps: { min: 18, max: 100 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={reportConfig.patientInfo.gender}
                    onChange={handlePatientInfoChange}
                    label="Gender"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Diagnosis"
                  name="diagnosis"
                  value={reportConfig.patientInfo.diagnosis}
                  onChange={handlePatientInfoChange}
                  placeholder="e.g., Osteoarthritis, Femoral neck fracture, etc."
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Activity Level</InputLabel>
                  <Select
                    name="activityLevel"
                    value={reportConfig.patientInfo.activityLevel}
                    onChange={handlePatientInfoChange}
                    label="Activity Level"
                  >
                    <MenuItem value="sedentary">Sedentary</MenuItem>
                    <MenuItem value="low">Low Activity</MenuItem>
                    <MenuItem value="moderate">Moderate Activity</MenuItem>
                    <MenuItem value="high">High Activity</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Report Content
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Select the prosthesis type and customize which sections to include in the report.
            </Typography>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Prosthesis Type</InputLabel>
              <Select
                value={reportConfig.prosthesisType}
                onChange={handleProsthesisTypeChange}
                label="Prosthesis Type"
              >
                <MenuItem value="total">Total Hip Replacement</MenuItem>
                <MenuItem value="partial">Partial Hip Replacement</MenuItem>
                <MenuItem value="resurfacing">Hip Resurfacing</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="subtitle2" gutterBottom>
              Include Sections:
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reportConfig.includeSections.patientProfile}
                        onChange={handleSectionToggle('patientProfile')}
                      />
                    }
                    label="Patient Profile"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reportConfig.includeSections.prosthesisDetails}
                        onChange={handleSectionToggle('prosthesisDetails')}
                      />
                    }
                    label="Prosthesis Details"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reportConfig.includeSections.materialAnalysis}
                        onChange={handleSectionToggle('materialAnalysis')}
                      />
                    }
                    label="Material Analysis"
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reportConfig.includeSections.stressAnalysis}
                        onChange={handleSectionToggle('stressAnalysis')}
                      />
                    }
                    label="Stress Analysis"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reportConfig.includeSections.costAnalysis}
                        onChange={handleSectionToggle('costAnalysis')}
                      />
                    }
                    label="Cost Analysis"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reportConfig.includeSections.environmentalImpact}
                        onChange={handleSectionToggle('environmentalImpact')}
                      />
                    }
                    label="Environmental Impact"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reportConfig.includeSections.references}
                        onChange={handleSectionToggle('references')}
                      />
                    }
                    label="References"
                  />
                </FormGroup>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
              <TextField
                fullWidth
                label="Additional Notes"
                multiline
                rows={4}
                value={reportConfig.additionalNotes}
                onChange={handleNotesChange}
                placeholder="Add any additional information or special considerations..."
              />
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Report Summary
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Review your report configuration before generating the PDF.
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      Patient Information
                    </Typography>
                    <Typography variant="body2">
                      <strong>Age:</strong> {reportConfig.patientInfo.age || 'Not specified'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Gender:</strong> {reportConfig.patientInfo.gender || 'Not specified'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Diagnosis:</strong> {reportConfig.patientInfo.diagnosis || 'Not specified'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Activity Level:</strong> {reportConfig.patientInfo.activityLevel || 'Not specified'}
                    </Typography>
                    <Typography variant="body2" color="error" sx={{ mt: 2, fontSize: '0.8rem' }}>
                      <strong>Note:</strong> Patient-specific information will be excluded from the PDF export for privacy protection.
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      Prosthesis Type
                    </Typography>
                    <Typography variant="body2">
                      {reportConfig.prosthesisType === 'total' && 'Total Hip Replacement'}
                      {reportConfig.prosthesisType === 'partial' && 'Partial Hip Replacement'}
                      {reportConfig.prosthesisType === 'resurfacing' && 'Hip Resurfacing'}
                      {!reportConfig.prosthesisType && 'Not specified'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      Included Sections
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {Object.entries(reportConfig.includeSections).map(([key, value]) => (
                        value && (
                          <Box
                            key={key}
                            sx={{
                              bgcolor: 'rgba(63,81,181,0.1)',
                              borderRadius: 4,
                              px: 1.5,
                              py: 0.5,
                              mr: 1,
                              mb: 1,
                              display: 'inline-block'
                            }}
                          >
                            <Typography variant="body2">
                              {key === 'patientProfile' && 'Patient Profile'}
                              {key === 'prosthesisDetails' && 'Prosthesis Details'}
                              {key === 'materialAnalysis' && 'Material Analysis'}
                              {key === 'stressAnalysis' && 'Stress Analysis'}
                              {key === 'costAnalysis' && 'Cost Analysis'}
                              {key === 'environmentalImpact' && 'Environmental Impact'}
                              {key === 'references' && 'References'}
                            </Typography>
                          </Box>
                        )
                      ))}
                    </Box>

                    {reportConfig.additionalNotes && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" color="primary" gutterBottom>
                          Additional Notes
                        </Typography>
                        <Typography variant="body2">
                          {reportConfig.additionalNotes}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {!reportGenerated ? (
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleGenerateReport}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <PictureAsPdfIcon />}
                  sx={{ borderRadius: 2, px: 4, py: 1.5 }}
                >
                  {loading ? 'Generating Report...' : 'Generate PDF Report'}
                </Button>
              </Box>
            ) : (
              <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                sx={{
                  mt: 4,
                  p: 3,
                  textAlign: 'center',
                  bgcolor: 'rgba(76,175,80,0.1)',
                  borderRadius: 2
                }}
              >
                <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" gutterBottom color="success.main">
                  Report Generated Successfully!
                </Typography>
                <Typography variant="body2" paragraph>
                  Your customized hip prosthesis report is ready for download.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DescriptionIcon />}
                  sx={{ borderRadius: 2, mt: 1 }}
                >
                  Download PDF Report (Patient Data Excluded)
                </Button>
              </Box>
            )}
          </Box>
        );

      default:
        return 'Unknown step';
    }
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
            Report Generator
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
            Create customized PDF reports with detailed hip prosthesis information for educational and reference purposes
          </Typography>
          <Divider sx={{ width: '120px', mx: 'auto', my: 3, borderColor: 'primary.main', borderWidth: 3, borderRadius: 2 }} />
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            mb: 4
          }}
        >
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box>
            {getStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 2, borderTop: '1px solid #e0e0e0' }}>
              <Button
                variant="outlined"
                color="primary"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ borderRadius: 2 }}
              >
                Back
              </Button>

              <Box>
                {reportGenerated && (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleReset}
                    sx={{ borderRadius: 2, mr: 2 }}
                  >
                    Create New Report
                  </Button>
                )}

                {activeStep < steps.length - 1 && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{ borderRadius: 2 }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>

        <Box sx={{ p: 3, bgcolor: 'rgba(63,81,181,0.05)', borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom color="primary">
            About This Tool
          </Typography>
          <Typography variant="body2" paragraph>
            The Report Generator allows you to create comprehensive PDF reports about hip prosthesis options. These reports can be customized to include specific information relevant to a patient's needs and can serve as valuable educational resources.
          </Typography>
          <Typography variant="body2" paragraph sx={{ color: 'error.main' }}>
            <strong>Data Privacy Notice:</strong> To protect patient privacy, any patient-specific information entered in this form will NOT be included in the generated PDF report. The PDF will only contain general information about prosthesis types, materials, and research findings that are relevant to the selected options.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Note:</strong> This tool is for educational purposes only. The generated reports should not replace professional medical advice or documentation.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ReportGeneratorPage;
