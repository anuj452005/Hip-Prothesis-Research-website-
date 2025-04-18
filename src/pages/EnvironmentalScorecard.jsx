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
  Button,
  Card,
  CardContent,
  LinearProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import InfoIcon from '@mui/icons-material/Info';
import DownloadIcon from '@mui/icons-material/Download';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PieChartIcon from '@mui/icons-material/PieChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import BarChartIcon from '@mui/icons-material/BarChart';

// Mock environmental impact data for different materials
const materialImpactData = {
  'titanium': {
    recyclability: 85,
    manufacturingEmissions: 65,
    disposalImpact: 40,
    waterUsage: 55,
    energyConsumption: 70,
    rawMaterialExtraction: 60,
    overallScore: 74,
    details: {
      advantages: [
        "Highly recyclable",
        "Durable, reducing replacement frequency",
        "Biocompatible, reducing adverse reactions"
      ],
      disadvantages: [
        "Energy-intensive manufacturing process",
        "Mining has significant environmental impact",
        "High CO2 emissions during production"
      ],
      lifecycle: "Titanium alloys have a long service life (15-20+ years) and can be recycled at end of life, though the recycling process is energy-intensive."
    }
  },
  'stainless_steel': {
    recyclability: 90,
    manufacturingEmissions: 60,
    disposalImpact: 45,
    waterUsage: 50,
    energyConsumption: 65,
    rawMaterialExtraction: 55,
    overallScore: 70,
    details: {
      advantages: [
        "Excellent recyclability",
        "Lower production energy than titanium",
        "Widely available recycling infrastructure"
      ],
      disadvantages: [
        "Contains nickel and chromium with mining impacts",
        "Heavier than titanium, requiring more material",
        "Potential for metal ion release"
      ],
      lifecycle: "Stainless steel implants typically last 10-15 years and are highly recyclable through established metal recycling channels."
    }
  },
  'cobalt_chromium': {
    recyclability: 75,
    manufacturingEmissions: 55,
    disposalImpact: 50,
    waterUsage: 60,
    energyConsumption: 60,
    rawMaterialExtraction: 40,
    overallScore: 62,
    details: {
      advantages: [
        "Good recyclability",
        "Excellent wear resistance, reducing debris",
        "Long service life reducing replacement need"
      ],
      disadvantages: [
        "Cobalt mining has significant ethical and environmental concerns",
        "Higher metal ion release potential",
        "Complex recycling process"
      ],
      lifecycle: "Cobalt-chromium alloys can last 15+ years and are recyclable, though the process is more complex than for other metals."
    }
  },
  'ceramic': {
    recyclability: 40,
    manufacturingEmissions: 75,
    disposalImpact: 65,
    waterUsage: 70,
    energyConsumption: 80,
    rawMaterialExtraction: 50,
    overallScore: 55,
    details: {
      advantages: [
        "Inert material with minimal biological impact",
        "Extremely low wear rates, reducing debris",
        "No metal ion release"
      ],
      disadvantages: [
        "Limited recyclability",
        "Very high firing temperatures during manufacturing",
        "Difficult to dispose of sustainably"
      ],
      lifecycle: "Ceramic components have excellent longevity (20+ years) but are difficult to recycle and typically end up in landfills."
    }
  },
  'polyethylene': {
    recyclability: 30,
    manufacturingEmissions: 50,
    disposalImpact: 85,
    waterUsage: 40,
    energyConsumption: 45,
    rawMaterialExtraction: 75,
    overallScore: 48,
    details: {
      advantages: [
        "Lower energy manufacturing than metals",
        "Lightweight, requiring less material",
        "No mining impact"
      ],
      disadvantages: [
        "Petroleum-based product",
        "Poor recyclability",
        "Generates microplastic particles",
        "Long degradation time in landfills"
      ],
      lifecycle: "Polyethylene components typically last 10-15 years and are difficult to recycle, with most ending up in landfills where they degrade very slowly."
    }
  }
};

// Mock environmental impact data for different prosthesis types
const prosthesisTypeImpactData = {
  'total': {
    recyclability: 65,
    manufacturingEmissions: 70,
    disposalImpact: 60,
    waterUsage: 65,
    energyConsumption: 75,
    rawMaterialExtraction: 60,
    overallScore: 65,
    details: {
      components: "Femoral stem, femoral head, acetabular cup, and liner",
      materialUsage: "Higher overall material usage due to multiple components",
      manufacturingComplexity: "Complex manufacturing with multiple materials and components",
      lifecycle: "Average lifespan of 15-20 years, with partial recyclability depending on materials used"
    }
  },
  'partial': {
    recyclability: 70,
    manufacturingEmissions: 60,
    disposalImpact: 55,
    waterUsage: 55,
    energyConsumption: 65,
    rawMaterialExtraction: 50,
    overallScore: 68,
    details: {
      components: "Femoral stem and femoral head only",
      materialUsage: "Lower material usage than total hip replacement",
      manufacturingComplexity: "Simpler manufacturing process with fewer components",
      lifecycle: "Average lifespan of 10-15 years, with good recyclability for metal components"
    }
  },
  'resurfacing': {
    recyclability: 80,
    manufacturingEmissions: 50,
    disposalImpact: 45,
    waterUsage: 45,
    energyConsumption: 55,
    rawMaterialExtraction: 40,
    overallScore: 72,
    details: {
      components: "Femoral cap and acetabular cup",
      materialUsage: "Minimal material usage, preserving natural bone",
      manufacturingComplexity: "Relatively simple manufacturing with fewer components",
      lifecycle: "Average lifespan of 10-15 years, with excellent recyclability for metal components"
    }
  }
};

// Helper function to determine color based on score
const getScoreColor = (score) => {
  if (score >= 75) return 'success.main';
  if (score >= 50) return 'warning.main';
  return 'error.main';
};

// Helper function to determine rating text based on score
const getScoreRating = (score) => {
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Very Good';
  if (score >= 60) return 'Good';
  if (score >= 50) return 'Fair';
  if (score >= 40) return 'Poor';
  return 'Very Poor';
};

const EnvironmentalScorecard = () => {
  // State for selected material and prosthesis type
  const [selectedMaterial, setSelectedMaterial] = useState('titanium');
  const [selectedProsthesisType, setSelectedProsthesisType] = useState('total');
  const [tabValue, setTabValue] = useState(0);
  const [viewMode, setViewMode] = useState('chart');

  // Handle material selection change
  const handleMaterialChange = (e) => {
    setSelectedMaterial(e.target.value);
  };

  // Handle prosthesis type selection change
  const handleProsthesisTypeChange = (e) => {
    setSelectedProsthesisType(e.target.value);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Get current data based on selected tab
  const getCurrentData = () => {
    return tabValue === 0 ? materialImpactData[selectedMaterial] : prosthesisTypeImpactData[selectedProsthesisType];
  };

  // Current environmental impact data
  const currentData = getCurrentData();

  // Render score indicator
  const renderScoreIndicator = (label, score, tooltipText) => (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2">{label}</Typography>
          <Tooltip title={tooltipText}>
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 'bold',
            color: getScoreColor(score)
          }}
        >
          {score}/100
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={score}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(0,0,0,0.05)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: getScoreColor(score),
            borderRadius: 4
          }
        }}
      />
    </Box>
  );

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
            Environmental Impact Scorecard
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
            Evaluate and compare the environmental sustainability of different hip prosthesis materials and designs
          </Typography>
          <Divider sx={{ width: '120px', mx: 'auto', my: 3, borderColor: 'primary.main', borderWidth: 3, borderRadius: 2 }} />
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 4,
            mb: 4
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{ mb: 3 }}
          >
            <Tab label="Material Impact" />
            <Tab label="Prosthesis Type Impact" />
          </Tabs>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              {tabValue === 0 ? (
                <FormControl fullWidth>
                  <InputLabel>Material</InputLabel>
                  <Select
                    value={selectedMaterial}
                    onChange={handleMaterialChange}
                    label="Material"
                  >
                    <MenuItem value="titanium">Titanium Alloy</MenuItem>
                    <MenuItem value="stainless_steel">Stainless Steel</MenuItem>
                    <MenuItem value="cobalt_chromium">Cobalt-Chromium</MenuItem>
                    <MenuItem value="ceramic">Ceramic</MenuItem>
                    <MenuItem value="polyethylene">Polyethylene</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <FormControl fullWidth>
                  <InputLabel>Prosthesis Type</InputLabel>
                  <Select
                    value={selectedProsthesisType}
                    onChange={handleProsthesisTypeChange}
                    label="Prosthesis Type"
                  >
                    <MenuItem value="total">Total Hip Replacement</MenuItem>
                    <MenuItem value="partial">Partial Hip Replacement</MenuItem>
                    <MenuItem value="resurfacing">Hip Resurfacing</MenuItem>
                  </Select>
                </FormControl>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  variant={viewMode === 'chart' ? 'contained' : 'outlined'}
                  color="primary"
                  startIcon={<BarChartIcon />}
                  onClick={() => handleViewModeChange('chart')}
                  sx={{ mr: 1, borderRadius: 2 }}
                >
                  Chart
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'contained' : 'outlined'}
                  color="primary"
                  startIcon={<TableChartIcon />}
                  onClick={() => handleViewModeChange('table')}
                  sx={{ borderRadius: 2 }}
                >
                  Table
                </Button>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Card sx={{
                  bgcolor: 'rgba(63,81,181,0.05)',
                  borderRadius: 2,
                  border: '1px solid rgba(63,81,181,0.1)'
                }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <PieChartIcon sx={{ mr: 1 }} />
                      Overall Sustainability Score
                    </Typography>

                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      my: 2
                    }}>
                      <Box sx={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        border: '8px solid',
                        borderColor: getScoreColor(currentData.overallScore),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2
                      }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {currentData.overallScore}
                        </Typography>
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          color: getScoreColor(currentData.overallScore),
                          fontWeight: 'bold'
                        }}
                      >
                        {getScoreRating(currentData.overallScore)}
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
                      {tabValue === 0 ? (
                        <>This material has {currentData.overallScore >= 70 ? 'good' : currentData.overallScore >= 50 ? 'moderate' : 'poor'} overall environmental sustainability.</>
                      ) : (
                        <>This prosthesis type has {currentData.overallScore >= 70 ? 'good' : currentData.overallScore >= 50 ? 'moderate' : 'poor'} overall environmental sustainability.</>
                      )}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<CompareArrowsIcon />}
                  fullWidth
                  sx={{ borderRadius: 2, mb: 2 }}
                >
                  Compare Multiple Options
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  fullWidth
                  sx={{ borderRadius: 2 }}
                >
                  Download Scorecard
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  height: '100%'
                }}
              >
                <Typography variant="h6" gutterBottom color="primary">
                  {tabValue === 0 ? (
                    <>Environmental Impact: {selectedMaterial === 'titanium' ? 'Titanium Alloy' :
                                           selectedMaterial === 'stainless_steel' ? 'Stainless Steel' :
                                           selectedMaterial === 'cobalt_chromium' ? 'Cobalt-Chromium' :
                                           selectedMaterial === 'ceramic' ? 'Ceramic' : 'Polyethylene'}</>
                  ) : (
                    <>Environmental Impact: {selectedProsthesisType === 'total' ? 'Total Hip Replacement' :
                                           selectedProsthesisType === 'partial' ? 'Partial Hip Replacement' :
                                           'Hip Resurfacing'}</>
                  )}
                </Typography>

                {viewMode === 'chart' ? (
                  <Box sx={{ mt: 3 }}>
                    {renderScoreIndicator(
                      'Recyclability',
                      currentData.recyclability,
                      'Measures how easily the material can be recycled at end of life'
                    )}

                    {renderScoreIndicator(
                      'Manufacturing Emissions',
                      currentData.manufacturingEmissions,
                      'Measures the carbon footprint and emissions during production'
                    )}

                    {renderScoreIndicator(
                      'Disposal Impact',
                      currentData.disposalImpact,
                      'Measures the environmental impact when disposed in landfills'
                    )}

                    {renderScoreIndicator(
                      'Water Usage',
                      currentData.waterUsage,
                      'Measures water consumption during manufacturing'
                    )}

                    {renderScoreIndicator(
                      'Energy Consumption',
                      currentData.energyConsumption,
                      'Measures energy required during production'
                    )}

                    {renderScoreIndicator(
                      'Raw Material Extraction',
                      currentData.rawMaterialExtraction,
                      'Measures the environmental impact of mining and extracting raw materials'
                    )}
                  </Box>
                ) : (
                  <TableContainer sx={{ mt: 3 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Environmental Factor</TableCell>
                          <TableCell align="center">Score</TableCell>
                          <TableCell align="center">Rating</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Recyclability</TableCell>
                          <TableCell align="center">{currentData.recyclability}/100</TableCell>
                          <TableCell align="center" sx={{ color: getScoreColor(currentData.recyclability) }}>
                            {getScoreRating(currentData.recyclability)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Manufacturing Emissions</TableCell>
                          <TableCell align="center">{currentData.manufacturingEmissions}/100</TableCell>
                          <TableCell align="center" sx={{ color: getScoreColor(currentData.manufacturingEmissions) }}>
                            {getScoreRating(currentData.manufacturingEmissions)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Disposal Impact</TableCell>
                          <TableCell align="center">{currentData.disposalImpact}/100</TableCell>
                          <TableCell align="center" sx={{ color: getScoreColor(currentData.disposalImpact) }}>
                            {getScoreRating(currentData.disposalImpact)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Water Usage</TableCell>
                          <TableCell align="center">{currentData.waterUsage}/100</TableCell>
                          <TableCell align="center" sx={{ color: getScoreColor(currentData.waterUsage) }}>
                            {getScoreRating(currentData.waterUsage)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Energy Consumption</TableCell>
                          <TableCell align="center">{currentData.energyConsumption}/100</TableCell>
                          <TableCell align="center" sx={{ color: getScoreColor(currentData.energyConsumption) }}>
                            {getScoreRating(currentData.energyConsumption)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Raw Material Extraction</TableCell>
                          <TableCell align="center">{currentData.rawMaterialExtraction}/100</TableCell>
                          <TableCell align="center" sx={{ color: getScoreColor(currentData.rawMaterialExtraction) }}>
                            {getScoreRating(currentData.rawMaterialExtraction)}
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ bgcolor: 'rgba(63,81,181,0.05)' }}>
                          <TableCell sx={{ fontWeight: 'bold' }}>Overall Score</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>{currentData.overallScore}/100</TableCell>
                          <TableCell align="center" sx={{ color: getScoreColor(currentData.overallScore), fontWeight: 'bold' }}>
                            {getScoreRating(currentData.overallScore)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}

                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Details & Considerations
                  </Typography>

                  {tabValue === 0 ? (
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2 }}>
                        Environmental Advantages:
                      </Typography>
                      <ul style={{ marginTop: 8, paddingLeft: 24 }}>
                        {currentData.details.advantages.map((advantage, index) => (
                          <li key={index}>
                            <Typography variant="body2">{advantage}</Typography>
                          </li>
                        ))}
                      </ul>

                      <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2 }}>
                        Environmental Disadvantages:
                      </Typography>
                      <ul style={{ marginTop: 8, paddingLeft: 24 }}>
                        {currentData.details.disadvantages.map((disadvantage, index) => (
                          <li key={index}>
                            <Typography variant="body2">{disadvantage}</Typography>
                          </li>
                        ))}
                      </ul>

                      <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2 }}>
                        Lifecycle Considerations:
                      </Typography>
                      <Typography variant="body2" paragraph sx={{ mt: 1 }}>
                        {currentData.details.lifecycle}
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2 }}>
                        Components:
                      </Typography>
                      <Typography variant="body2" paragraph sx={{ mt: 1 }}>
                        {currentData.details.components}
                      </Typography>

                      <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2 }}>
                        Material Usage:
                      </Typography>
                      <Typography variant="body2" paragraph sx={{ mt: 1 }}>
                        {currentData.details.materialUsage}
                      </Typography>

                      <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2 }}>
                        Manufacturing Complexity:
                      </Typography>
                      <Typography variant="body2" paragraph sx={{ mt: 1 }}>
                        {currentData.details.manufacturingComplexity}
                      </Typography>

                      <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2 }}>
                        Lifecycle Considerations:
                      </Typography>
                      <Typography variant="body2" paragraph sx={{ mt: 1 }}>
                        {currentData.details.lifecycle}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ mt: 6, p: 3, bgcolor: 'rgba(63,81,181,0.05)', borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom color="primary">
            About This Scorecard
          </Typography>
          <Typography variant="body2" paragraph>
            The Environmental Impact Scorecard provides a comprehensive assessment of the sustainability aspects of different hip prosthesis materials and designs. This tool helps evaluate the environmental footprint throughout the entire lifecycle, from raw material extraction to manufacturing, use, and end-of-life disposal.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Note:</strong> The scores are based on current research and industry data. Environmental impact assessment methodologies continue to evolve, and these ratings should be considered as relative comparisons rather than absolute measurements.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default EnvironmentalScorecard;
