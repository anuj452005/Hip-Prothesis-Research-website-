import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
  Card,
  CardContent,
  Tooltip,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { Radar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
);

// Material data
const materialsData = {
  'Titanium Alloy': {
    id: 'titanium',
    fullName: 'Titanium Alloy (Ti-6Al-4V)',
    color: '#3f51b5',
    physicalProperties: {
      density: '4.43 g/cm³',
      youngsModulus: '110-120 GPa',
      tensileStrength: '900-1200 MPa',
      yieldStrength: '800-1100 MPa',
      elongation: '10-15%',
      biocompatibility: 'Excellent',
      corrosionResistance: 'Excellent',
      wearResistance: 'Good'
    },
    performanceMetrics: {
      strength: 85,
      weight: 90,
      biocompatibility: 95,
      corrosionResistance: 95,
      wearResistance: 75,
      costEffectiveness: 65
    },
    stressStrainData: [
      { strain: 0, stress: 0 },
      { strain: 0.2, stress: 200 },
      { strain: 0.4, stress: 400 },
      { strain: 0.6, stress: 600 },
      { strain: 0.8, stress: 750 },
      { strain: 1.0, stress: 850 },
      { strain: 1.2, stress: 920 },
      { strain: 1.4, stress: 970 },
      { strain: 1.6, stress: 1000 },
      { strain: 1.8, stress: 1020 },
      { strain: 2.0, stress: 1030 }
    ],
    description: 'Titanium alloys are lightweight with excellent strength-to-weight ratio and superior biocompatibility. Ti-6Al-4V is the most commonly used titanium alloy in hip prostheses, particularly for femoral stems.',
    advantages: [
      'Excellent biocompatibility',
      'High strength-to-weight ratio',
      'Superior corrosion resistance',
      'Low elastic modulus (closer to bone)',
      'Excellent osseointegration'
    ],
    disadvantages: [
      'Lower wear resistance than cobalt-chromium',
      'Higher cost than stainless steel',
      'Potential for ion release (though minimal)',
      'Lower hardness compared to ceramics'
    ],
    applications: 'Primarily used for femoral stems and acetabular shells in hip prostheses.'
  },
  'Cobalt-Chromium': {
    id: 'cobalt-chromium',
    fullName: 'Cobalt-Chromium Alloy (CoCrMo)',
    color: '#f44336',
    physicalProperties: {
      density: '8.3-9.2 g/cm³',
      youngsModulus: '210-250 GPa',
      tensileStrength: '900-1540 MPa',
      yieldStrength: '450-1000 MPa',
      elongation: '10-20%',
      biocompatibility: 'Very Good',
      corrosionResistance: 'Excellent',
      wearResistance: 'Excellent'
    },
    performanceMetrics: {
      strength: 90,
      weight: 60,
      biocompatibility: 85,
      corrosionResistance: 90,
      wearResistance: 95,
      costEffectiveness: 70
    },
    stressStrainData: [
      { strain: 0, stress: 0 },
      { strain: 0.2, stress: 300 },
      { strain: 0.4, stress: 600 },
      { strain: 0.6, stress: 850 },
      { strain: 0.8, stress: 1050 },
      { strain: 1.0, stress: 1200 },
      { strain: 1.2, stress: 1300 },
      { strain: 1.4, stress: 1380 },
      { strain: 1.6, stress: 1430 },
      { strain: 1.8, stress: 1470 },
      { strain: 2.0, stress: 1500 }
    ],
    description: 'Cobalt-chromium alloys offer exceptional wear resistance and strength. CoCrMo is widely used in load-bearing applications where durability and wear resistance are critical.',
    advantages: [
      'Superior wear resistance',
      'Excellent mechanical strength',
      'High fatigue resistance',
      'Good corrosion resistance',
      'Excellent polishability for articulating surfaces'
    ],
    disadvantages: [
      'Higher density (heavier) than titanium',
      'Higher elastic modulus (stiffer than bone)',
      'Potential for metal ion release',
      'More expensive than stainless steel'
    ],
    applications: 'Commonly used for femoral heads, modular necks, and high-stress components.'
  },
  'Stainless Steel': {
    id: 'stainless-steel',
    fullName: 'Stainless Steel (316L)',
    color: '#9e9e9e',
    physicalProperties: {
      density: '7.9-8.1 g/cm³',
      youngsModulus: '190-210 GPa',
      tensileStrength: '540-620 MPa',
      yieldStrength: '170-310 MPa',
      elongation: '30-40%',
      biocompatibility: 'Good',
      corrosionResistance: 'Good',
      wearResistance: 'Moderate'
    },
    performanceMetrics: {
      strength: 70,
      weight: 65,
      biocompatibility: 75,
      corrosionResistance: 75,
      wearResistance: 65,
      costEffectiveness: 90
    },
    stressStrainData: [
      { strain: 0, stress: 0 },
      { strain: 0.2, stress: 170 },
      { strain: 0.4, stress: 280 },
      { strain: 0.6, stress: 350 },
      { strain: 0.8, stress: 400 },
      { strain: 1.0, stress: 450 },
      { strain: 1.2, stress: 490 },
      { strain: 1.4, stress: 520 },
      { strain: 1.6, stress: 540 },
      { strain: 1.8, stress: 560 },
      { strain: 2.0, stress: 570 }
    ],
    description: 'Stainless steel 316L is a cost-effective material with good mechanical properties. It has been used in orthopedic implants for decades, though its use in hip prostheses has declined with the advent of superior materials.',
    advantages: [
      'Cost-effective',
      'Good mechanical properties',
      'Excellent ductility',
      'Well-established manufacturing processes',
      'Good corrosion resistance'
    ],
    disadvantages: [
      'Lower biocompatibility than titanium',
      'Higher elastic modulus (stiffer than bone)',
      'Potential for nickel sensitivity',
      'Lower corrosion resistance than titanium or cobalt-chromium',
      'Moderate wear resistance'
    ],
    applications: 'Used in temporary implants, fixation devices, and some femoral stems in regions with cost constraints.'
  },
  'Ceramics': {
    id: 'ceramics',
    fullName: 'Advanced Ceramics (Alumina/Zirconia)',
    color: '#4caf50',
    physicalProperties: {
      density: '3.9-6.1 g/cm³',
      youngsModulus: '300-400 GPa',
      tensileStrength: '300-700 MPa',
      yieldStrength: 'N/A (brittle)',
      elongation: '<0.1%',
      biocompatibility: 'Excellent',
      corrosionResistance: 'Excellent',
      wearResistance: 'Excellent'
    },
    performanceMetrics: {
      strength: 75,
      weight: 85,
      biocompatibility: 98,
      corrosionResistance: 100,
      wearResistance: 98,
      costEffectiveness: 60
    },
    stressStrainData: [
      { strain: 0, stress: 0 },
      { strain: 0.05, stress: 150 },
      { strain: 0.1, stress: 300 },
      { strain: 0.15, stress: 450 },
      { strain: 0.2, stress: 600 },
      { strain: 0.25, stress: 700 },
      { strain: 0.3, stress: 0 } // Fracture point
    ],
    description: 'Advanced ceramics like alumina and zirconia offer exceptional hardness, wear resistance, and biocompatibility. They are primarily used for articulating surfaces in hip prostheses.',
    advantages: [
      'Superior wear resistance',
      'Excellent biocompatibility',
      'No metal ion release',
      'Low friction coefficient',
      'Excellent corrosion resistance',
      'Hydrophilic surface (better lubrication)'
    ],
    disadvantages: [
      'Brittle nature (risk of fracture)',
      'Limited design flexibility',
      'Higher manufacturing costs',
      'Requires precise surgical technique',
      'Limited revision options if failure occurs'
    ],
    applications: 'Primarily used for femoral heads and acetabular liners in hip prostheses.'
  },
  'Polyethylene': {
    id: 'polyethylene',
    fullName: 'Ultra-High Molecular Weight Polyethylene (UHMWPE)',
    color: '#2196f3',
    physicalProperties: {
      density: '0.93-0.94 g/cm³',
      youngsModulus: '0.8-1.6 GPa',
      tensileStrength: '35-45 MPa',
      yieldStrength: '20-30 MPa',
      elongation: '350-525%',
      biocompatibility: 'Very Good',
      corrosionResistance: 'Excellent',
      wearResistance: 'Moderate to Good'
    },
    performanceMetrics: {
      strength: 40,
      weight: 95,
      biocompatibility: 85,
      corrosionResistance: 100,
      wearResistance: 70,
      costEffectiveness: 85
    },
    stressStrainData: [
      { strain: 0, stress: 0 },
      { strain: 0.5, stress: 15 },
      { strain: 1.0, stress: 25 },
      { strain: 1.5, stress: 30 },
      { strain: 2.0, stress: 35 },
      { strain: 2.5, stress: 38 },
      { strain: 3.0, stress: 40 },
      { strain: 3.5, stress: 42 },
      { strain: 4.0, stress: 43 },
      { strain: 4.5, stress: 44 },
      { strain: 5.0, stress: 45 }
    ],
    description: 'UHMWPE is a high-performance polymer used extensively in hip prostheses as a bearing surface. Modern highly cross-linked polyethylene has significantly improved wear resistance compared to conventional polyethylene.',
    advantages: [
      'Excellent shock absorption',
      'Low friction coefficient',
      'Lightweight',
      'Cost-effective',
      'Highly cross-linked versions offer improved wear resistance',
      'Vitamin E-infused versions resist oxidation'
    ],
    disadvantages: [
      'Wear debris can lead to osteolysis',
      'Limited strength compared to metals and ceramics',
      'Susceptible to oxidation (conventional UHMWPE)',
      'Potential for creep and deformation under load',
      'Limited lifespan compared to ceramic bearings'
    ],
    applications: 'Primarily used for acetabular liners in hip prostheses.'
  }
};

const MaterialComparisonPanel = () => {
  const [selectedMaterials, setSelectedMaterials] = useState(['Titanium Alloy']);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMaterialToggle = (event, newMaterials) => {
    // Ensure at least one material is selected
    if (newMaterials.length) {
      setSelectedMaterials(newMaterials);
    }
  };

  // Prepare radar chart data for performance comparison
  const radarData = {
    labels: ['Strength', 'Weight', 'Biocompatibility', 'Corrosion Resistance', 'Wear Resistance', 'Cost-Effectiveness'],
    datasets: selectedMaterials.map(material => ({
      label: material,
      data: [
        materialsData[material].performanceMetrics.strength,
        materialsData[material].performanceMetrics.weight,
        materialsData[material].performanceMetrics.biocompatibility,
        materialsData[material].performanceMetrics.corrosionResistance,
        materialsData[material].performanceMetrics.wearResistance,
        materialsData[material].performanceMetrics.costEffectiveness
      ],
      backgroundColor: `${materialsData[material].color}33`,
      borderColor: materialsData[material].color,
      borderWidth: 2,
      pointBackgroundColor: materialsData[material].color,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: materialsData[material].color,
      pointRadius: 4
    }))
  };

  // Prepare stress-strain chart data
  const stressStrainData = {
    labels: Array.from({ length: 21 }, (_, i) => (i / 10).toFixed(1)),
    datasets: selectedMaterials.map(material => ({
      label: material,
      data: materialsData[material].stressStrainData.map(point => point.stress),
      borderColor: materialsData[material].color,
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.4
    }))
  };

  // Chart options
  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'rgba(255, 255, 255, 0.8)'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          font: {
            size: 11,
            weight: 'bold'
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}/100`;
          }
        }
      }
    }
  };

  const lineOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Strain (%)',
          font: {
            weight: 'bold'
          }
        },
        ticks: {
          maxTicksLimit: 10
        }
      },
      y: {
        title: {
          display: true,
          text: 'Stress (MPa)',
          font: {
            weight: 'bold'
          }
        },
        ticks: {
          maxTicksLimit: 8
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw} MPa`;
          }
        }
      }
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <CompareArrowsIcon color="primary" sx={{ fontSize: 28, mr: 2 }} />
          <Typography variant="h4" component="h2" color="primary" gutterBottom sx={{ mb: 0, flexGrow: 1 }}>
            Material Analysis & Comparison
          </Typography>
          <Tooltip title="Select multiple materials to compare their properties side by side">
            <IconButton size="small">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography variant="body1" color="text.secondary" paragraph>
          Compare the physical properties, performance metrics, and stress-strain behavior of different materials used in hip prostheses.
          Select multiple materials to see a side-by-side scientific comparison.
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Select Materials to Compare
          </Typography>
          <ToggleButtonGroup
            value={selectedMaterials}
            onChange={handleMaterialToggle}
            aria-label="material selection"
            color="primary"
            sx={{ flexWrap: 'wrap' }}
            size={isMobile ? "small" : "medium"}
          >
            {Object.keys(materialsData).map((material) => (
              <ToggleButton 
                key={material} 
                value={material}
                sx={{ 
                  mr: 1, 
                  mb: 1,
                  borderRadius: '4px',
                  borderColor: selectedMaterials.includes(material) ? materialsData[material].color : 'rgba(0, 0, 0, 0.12)',
                  backgroundColor: selectedMaterials.includes(material) ? `${materialsData[material].color}15` : 'transparent',
                  '&.Mui-selected': {
                    backgroundColor: `${materialsData[material].color}15`,
                    borderColor: materialsData[material].color,
                    color: materialsData[material].color,
                    '&:hover': {
                      backgroundColor: `${materialsData[material].color}25`,
                    }
                  }
                }}
              >
                {material}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Material Details */}
        {selectedMaterials.map((material) => (
          <Box key={material} sx={{ mb: 4 }}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                color: materialsData[material].color,
                borderBottom: `2px solid ${materialsData[material].color}`,
                pb: 1,
                display: 'inline-block'
              }}
            >
              {materialsData[material].fullName}
            </Typography>
            <Typography variant="body2" paragraph>
              {materialsData[material].description}
            </Typography>
          </Box>
        ))}

        <Grid container spacing={4}>
          {/* Physical Properties Comparison */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Physical Properties Comparison
            </Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Property</TableCell>
                    {selectedMaterials.map((material) => (
                      <TableCell key={material} sx={{ fontWeight: 'bold', color: materialsData[material].color }}>
                        {material}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Density</TableCell>
                    {selectedMaterials.map((material) => (
                      <TableCell key={material}>{materialsData[material].physicalProperties.density}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Young's Modulus</TableCell>
                    {selectedMaterials.map((material) => (
                      <TableCell key={material}>{materialsData[material].physicalProperties.youngsModulus}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Tensile Strength</TableCell>
                    {selectedMaterials.map((material) => (
                      <TableCell key={material}>{materialsData[material].physicalProperties.tensileStrength}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Yield Strength</TableCell>
                    {selectedMaterials.map((material) => (
                      <TableCell key={material}>{materialsData[material].physicalProperties.yieldStrength}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Elongation</TableCell>
                    {selectedMaterials.map((material) => (
                      <TableCell key={material}>{materialsData[material].physicalProperties.elongation}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Biocompatibility</TableCell>
                    {selectedMaterials.map((material) => (
                      <TableCell key={material}>{materialsData[material].physicalProperties.biocompatibility}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Corrosion Resistance</TableCell>
                    {selectedMaterials.map((material) => (
                      <TableCell key={material}>{materialsData[material].physicalProperties.corrosionResistance}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Wear Resistance</TableCell>
                    {selectedMaterials.map((material) => (
                      <TableCell key={material}>{materialsData[material].physicalProperties.wearResistance}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Stress-Strain Visualization */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Stress-Strain Visualization
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Comparison of stress-strain behavior under tensile loading
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Line data={stressStrainData} options={lineOptions} />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, fontStyle: 'italic' }}>
                  Note: Ceramics exhibit brittle fracture behavior with minimal plastic deformation
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Performance Radar Chart */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Performance Metrics Comparison
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Radar chart comparing key performance metrics (higher is better)
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Radar data={radarData} options={radarOptions} />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, fontStyle: 'italic' }}>
                  Metrics normalized on a scale of 0-100 for comparison purposes
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Advantages and Disadvantages */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
              Advantages & Disadvantages
            </Typography>
            <Grid container spacing={3}>
              {selectedMaterials.map((material) => (
                <Grid item xs={12} md={6} key={`${material}-advantages`}>
                  <Card 
                    elevation={1} 
                    sx={{ 
                      mb: 2, 
                      borderLeft: `4px solid ${materialsData[material].color}`,
                      height: '100%'
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom sx={{ color: materialsData[material].color, fontWeight: 600 }}>
                        {material} - Key Characteristics
                      </Typography>
                      
                      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                        Advantages:
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                        {materialsData[material].advantages.map((advantage, index) => (
                          <Box component="li" key={index} sx={{ mb: 0.5 }}>
                            <Typography variant="body2">{advantage}</Typography>
                          </Box>
                        ))}
                      </Box>
                      
                      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                        Disadvantages:
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                        {materialsData[material].disadvantages.map((disadvantage, index) => (
                          <Box component="li" key={index} sx={{ mb: 0.5 }}>
                            <Typography variant="body2">{disadvantage}</Typography>
                          </Box>
                        ))}
                      </Box>
                      
                      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                        Primary Applications:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {materialsData[material].applications}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
            <span>
              <strong>Note:</strong> Material properties may vary based on manufacturing processes, heat treatments, and specific alloy compositions. 
              Data presented is based on standardized testing under laboratory conditions and may not reflect in vivo performance.
            </span>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default MaterialComparisonPanel;
