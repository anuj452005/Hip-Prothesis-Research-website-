import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Tabs, 
  Tab, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Divider,
  Chip,
  Rating,
  Button,
  Tooltip
} from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import InfoIcon from '@mui/icons-material/Info';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, ChartTooltip, Legend);

// Material data
const materials = [
  {
    id: 'titanium',
    name: 'Titanium Alloy',
    image: '/images/titanium.jpg', // Placeholder - would need actual image
    description: 'Titanium alloys are lightweight, strong, and highly biocompatible. They have excellent corrosion resistance and are commonly used for femoral stems.',
    properties: {
      strength: 9,
      weight: 8,
      biocompatibility: 10,
      corrosionResistance: 9,
      wearResistance: 7,
      costEffectiveness: 6
    },
    advantages: [
      'Excellent biocompatibility',
      'Low modulus of elasticity (reduces stress shielding)',
      'Lightweight',
      'Excellent corrosion resistance'
    ],
    disadvantages: [
      'Higher cost',
      'Lower wear resistance than cobalt-chromium',
      'Poor shear strength'
    ],
    applications: [
      'Femoral stems',
      'Acetabular cups',
      'Revision implants'
    ]
  },
  {
    id: 'cobaltChromium',
    name: 'Cobalt-Chromium',
    image: '/images/cobalt-chromium.jpg', // Placeholder - would need actual image
    description: 'Cobalt-chromium alloys offer excellent wear resistance and strength. They are commonly used for femoral heads and acetabular liners due to their durability.',
    properties: {
      strength: 10,
      weight: 5,
      biocompatibility: 8,
      corrosionResistance: 8,
      wearResistance: 9,
      costEffectiveness: 7
    },
    advantages: [
      'Excellent wear resistance',
      'High strength and hardness',
      'Good corrosion resistance',
      'Excellent fatigue resistance'
    ],
    disadvantages: [
      'Heavier than titanium',
      'Higher modulus (can cause stress shielding)',
      'Potential for metal ion release'
    ],
    applications: [
      'Femoral heads',
      'Acetabular liners',
      'High-stress components'
    ]
  },
  {
    id: 'ceramic',
    name: 'Ceramic',
    image: '/images/ceramic.jpg', // Placeholder - would need actual image
    description: 'Ceramics like alumina and zirconia offer exceptional wear resistance and biocompatibility. They are ideal for articulating surfaces but can be brittle.',
    properties: {
      strength: 7,
      weight: 7,
      biocompatibility: 10,
      corrosionResistance: 10,
      wearResistance: 10,
      costEffectiveness: 5
    },
    advantages: [
      'Excellent wear resistance',
      'Very low friction coefficient',
      'Excellent biocompatibility',
      'No metal ion release'
    ],
    disadvantages: [
      'Brittle (risk of fracture)',
      'Higher cost',
      'Limited design flexibility'
    ],
    applications: [
      'Femoral heads',
      'Acetabular liners',
      'Articulating surfaces'
    ]
  },
  {
    id: 'polyethylene',
    name: 'Polyethylene',
    image: '/images/polyethylene.jpg', // Placeholder - would need actual image
    description: 'Ultra-high molecular weight polyethylene (UHMWPE) is commonly used for acetabular liners. Modern cross-linked versions offer improved wear resistance.',
    properties: {
      strength: 5,
      weight: 9,
      biocompatibility: 8,
      corrosionResistance: 10,
      wearResistance: 6,
      costEffectiveness: 9
    },
    advantages: [
      'Low friction',
      'Shock absorption',
      'Cost-effective',
      'No corrosion'
    ],
    disadvantages: [
      'Lower wear resistance (though improved with cross-linking)',
      'Oxidative degradation over time',
      'Lower strength than metals'
    ],
    applications: [
      'Acetabular liners',
      'Tibial components in knee replacements'
    ]
  },
  {
    id: 'stainlessSteel',
    name: 'Stainless Steel',
    image: '/images/stainless-steel.jpg', // Placeholder - would need actual image
    description: 'Stainless steel was one of the first materials used for hip implants. While less common today, it is still used in some temporary implants and surgical instruments.',
    properties: {
      strength: 8,
      weight: 4,
      biocompatibility: 7,
      corrosionResistance: 7,
      wearResistance: 7,
      costEffectiveness: 8
    },
    advantages: [
      'Good strength',
      'Cost-effective',
      'Easy to manufacture',
      'Good corrosion resistance'
    ],
    disadvantages: [
      'Heavier than titanium',
      'Lower biocompatibility',
      'Higher risk of corrosion in vivo',
      'Higher modulus (stress shielding)'
    ],
    applications: [
      'Temporary implants',
      'Surgical instruments',
      'Less commonly used in permanent implants'
    ]
  }
];

const InteractiveMaterialComparison = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState([materials[0].id, materials[1].id]);
  
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  
  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
  };
  
  const handleMaterialSelection = (materialId) => {
    if (selectedMaterials.includes(materialId)) {
      // Remove if already selected
      if (selectedMaterials.length > 1) {
        setSelectedMaterials(selectedMaterials.filter(id => id !== materialId));
      }
    } else {
      // Add if not selected (max 3)
      if (selectedMaterials.length < 3) {
        setSelectedMaterials([...selectedMaterials, materialId]);
      } else {
        // Replace the first one if already have 3
        setSelectedMaterials([...selectedMaterials.slice(1), materialId]);
      }
    }
  };
  
  // Prepare radar chart data for comparison
  const getRadarData = () => {
    const selectedMaterialsData = materials.filter(m => selectedMaterials.includes(m.id));
    
    return {
      labels: ['Strength', 'Weight', 'Biocompatibility', 'Corrosion Resistance', 'Wear Resistance', 'Cost-Effectiveness'],
      datasets: selectedMaterialsData.map((material, index) => {
        const colors = ['rgba(63, 81, 181, 0.2)', 'rgba(245, 0, 87, 0.2)', 'rgba(76, 175, 80, 0.2)'];
        const borderColors = ['rgb(63, 81, 181)', 'rgb(245, 0, 87)', 'rgb(76, 175, 80)'];
        
        return {
          label: material.name,
          data: [
            material.properties.strength,
            material.properties.weight,
            material.properties.biocompatibility,
            material.properties.corrosionResistance,
            material.properties.wearResistance,
            material.properties.costEffectiveness
          ],
          backgroundColor: colors[index],
          borderColor: borderColors[index],
          borderWidth: 2
        };
      })
    };
  };
  
  const radarOptions = {
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 2
        }
      }
    }
  };
  
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Interactive Material Comparison
        </Typography>
        
        <Button
          variant={compareMode ? "contained" : "outlined"}
          color="primary"
          startIcon={<CompareArrowsIcon />}
          onClick={toggleCompareMode}
        >
          {compareMode ? "Exit Compare" : "Compare Materials"}
        </Button>
      </Box>
      
      {compareMode ? (
        <Box>
          <Typography variant="body1" paragraph>
            Select up to three materials to compare their properties side by side.
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {materials.map((material) => (
              <Chip
                key={material.id}
                label={material.name}
                color={selectedMaterials.includes(material.id) ? "primary" : "default"}
                onClick={() => handleMaterialSelection(material.id)}
                variant={selectedMaterials.includes(material.id) ? "filled" : "outlined"}
              />
            ))}
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Property Comparison
                </Typography>
                <Box sx={{ height: 400 }}>
                  <Radar data={getRadarData()} options={radarOptions} />
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Applications & Characteristics
                </Typography>
                
                <Grid container spacing={2}>
                  {materials
                    .filter(m => selectedMaterials.includes(m.id))
                    .map((material) => (
                      <Grid item xs={12} key={material.id}>
                        <Card variant="outlined" sx={{ mb: 2 }}>
                          <CardContent>
                            <Typography variant="h6" color="primary" gutterBottom>
                              {material.name}
                            </Typography>
                            
                            <Typography variant="body2" paragraph>
                              {material.description}
                            </Typography>
                            
                            <Typography variant="subtitle2" gutterBottom>
                              Common Applications:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                              {material.applications.map((app, index) => (
                                <Chip key={index} label={app} size="small" variant="outlined" />
                              ))}
                            </Box>
                            
                            <Divider sx={{ my: 1 }} />
                            
                            <Grid container spacing={1}>
                              <Grid item xs={6}>
                                <Typography variant="subtitle2" gutterBottom>
                                  Advantages:
                                </Typography>
                                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                                  {material.advantages.map((adv, index) => (
                                    <li key={index}>
                                      <Typography variant="body2">
                                        {adv}
                                      </Typography>
                                    </li>
                                  ))}
                                </ul>
                              </Grid>
                              
                              <Grid item xs={6}>
                                <Typography variant="subtitle2" gutterBottom>
                                  Disadvantages:
                                </Typography>
                                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                                  {material.disadvantages.map((disadv, index) => (
                                    <li key={index}>
                                      <Typography variant="body2">
                                        {disadv}
                                      </Typography>
                                    </li>
                                  ))}
                                </ul>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 3 }}
          >
            {materials.map((material) => (
              <Tab key={material.id} label={material.name} />
            ))}
          </Tabs>
          
          {materials.map((material, index) => (
            <Box key={material.id} sx={{ display: selectedTab === index ? 'block' : 'none' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardMedia
                      component="div"
                      sx={{
                        height: 200,
                        backgroundColor: '#eee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {material.name} Image
                      </Typography>
                    </CardMedia>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {material.name}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {material.description}
                      </Typography>
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Common Applications:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {material.applications.map((app, index) => (
                          <Chip key={index} label={app} size="small" />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Material Properties
                      </Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Strength</Typography>
                          <Rating value={material.properties.strength / 2} readOnly precision={0.5} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Weight (Lightness)</Typography>
                          <Rating value={material.properties.weight / 2} readOnly precision={0.5} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Biocompatibility</Typography>
                          <Rating value={material.properties.biocompatibility / 2} readOnly precision={0.5} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Corrosion Resistance</Typography>
                          <Rating value={material.properties.corrosionResistance / 2} readOnly precision={0.5} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Wear Resistance</Typography>
                          <Rating value={material.properties.wearResistance / 2} readOnly precision={0.5} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Cost-Effectiveness</Typography>
                          <Rating value={material.properties.costEffectiveness / 2} readOnly precision={0.5} />
                        </Box>
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Box sx={{ height: 250 }}>
                        <Radar 
                          data={{
                            labels: ['Strength', 'Weight', 'Biocompatibility', 'Corrosion Resistance', 'Wear Resistance', 'Cost-Effectiveness'],
                            datasets: [
                              {
                                label: material.name,
                                data: [
                                  material.properties.strength,
                                  material.properties.weight,
                                  material.properties.biocompatibility,
                                  material.properties.corrosionResistance,
                                  material.properties.wearResistance,
                                  material.properties.costEffectiveness
                                ],
                                backgroundColor: 'rgba(63, 81, 181, 0.2)',
                                borderColor: 'rgb(63, 81, 181)',
                                borderWidth: 2
                              }
                            ]
                          }} 
                          options={radarOptions} 
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Advantages & Disadvantages
                      </Typography>
                      
                      <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title="Key benefits of this material">
                          <InfoIcon fontSize="small" sx={{ mr: 0.5 }} />
                        </Tooltip>
                        Advantages:
                      </Typography>
                      <ul>
                        {material.advantages.map((adv, index) => (
                          <li key={index}>
                            <Typography variant="body2">
                              {adv}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title="Limitations to consider">
                          <InfoIcon fontSize="small" sx={{ mr: 0.5 }} />
                        </Tooltip>
                        Disadvantages:
                      </Typography>
                      <ul>
                        {material.disadvantages.map((disadv, index) => (
                          <li key={index}>
                            <Typography variant="body2">
                              {disadv}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default InteractiveMaterialComparison;
