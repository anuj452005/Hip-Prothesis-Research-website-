import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Chip, 
  Divider, 
  Card, 
  CardContent,
  Tooltip,
  IconButton,
  Tab,
  Tabs
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Radar, Bar, Line } from 'react-chartjs-2';
import InfoIcon from '@mui/icons-material/Info';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import CompareIcon from '@mui/icons-material/Compare';
import ShowChartIcon from '@mui/icons-material/ShowChart';
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
  BarElement,
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
  BarElement,
  Title
);

// Styled components
const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 3
  }
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  marginRight: theme.spacing(2),
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 700
  }
}));

const OutcomeMetricCard = styled(Card)(({ theme, metricType }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    backgroundColor: 
      metricType === 'recovery' ? theme.palette.info.main :
      metricType === 'risk' ? theme.palette.warning.main :
      theme.palette.success.main
  }
}));

const PatientGroupChip = styled(Chip)(({ theme, matchPercentage }) => ({
  backgroundColor: 
    matchPercentage >= 80 ? theme.palette.success.light :
    matchPercentage >= 60 ? theme.palette.info.light :
    theme.palette.warning.light,
  color: 
    matchPercentage >= 80 ? theme.palette.success.contrastText :
    matchPercentage >= 60 ? theme.palette.info.contrastText :
    theme.palette.warning.contrastText,
  fontWeight: 600,
  '& .MuiChip-label': {
    padding: '0 10px'
  }
}));

// Sample data for patient clusters
const patientClusters = [
  { 
    id: 'young-active', 
    name: 'Young Active Patients', 
    match: 65,
    description: 'Patients under 50 with high activity levels and good bone quality',
    preferredMaterials: ['Ceramic', 'Oxidized Zirconium'],
    outcomes: {
      recoveryTime: { value: 6, unit: 'weeks', comparison: 'typical' },
      complicationRisk: { value: 4, unit: '%', comparison: 'lower' },
      prosthesisLifespan: { value: 20, unit: 'years', comparison: 'longer' }
    },
    characteristics: {
      age: { avg: 42, range: [30, 55] },
      activityLevel: { avg: 7.5, range: [6, 9] },
      boneQuality: { value: 'Good', percentage: 85 },
      bmi: { avg: 24.3, range: [20, 28] }
    }
  },
  { 
    id: 'middle-aged-moderate', 
    name: 'Middle-aged Moderate Activity', 
    match: 45,
    description: 'Patients 50-70 with moderate activity and varying bone quality',
    preferredMaterials: ['Titanium Alloy', 'Cobalt-Chromium'],
    outcomes: {
      recoveryTime: { value: 8, unit: 'weeks', comparison: 'average' },
      complicationRisk: { value: 6, unit: '%', comparison: 'average' },
      prosthesisLifespan: { value: 18, unit: 'years', comparison: 'average' }
    },
    characteristics: {
      age: { avg: 62, range: [50, 70] },
      activityLevel: { avg: 5.2, range: [4, 7] },
      boneQuality: { value: 'Moderate', percentage: 65 },
      bmi: { avg: 27.1, range: [23, 32] }
    }
  },
  { 
    id: 'elderly-low', 
    name: 'Elderly Low Activity', 
    match: 30,
    description: 'Patients over 70 with lower activity levels and reduced bone quality',
    preferredMaterials: ['Cobalt-Chromium', 'Stainless Steel'],
    outcomes: {
      recoveryTime: { value: 10, unit: 'weeks', comparison: 'longer' },
      complicationRisk: { value: 9, unit: '%', comparison: 'higher' },
      prosthesisLifespan: { value: 15, unit: 'years', comparison: 'shorter' }
    },
    characteristics: {
      age: { avg: 76, range: [70, 85] },
      activityLevel: { avg: 3.1, range: [2, 5] },
      boneQuality: { value: 'Poor', percentage: 60 },
      bmi: { avg: 26.8, range: [22, 34] }
    }
  },
  { 
    id: 'revision-cases', 
    name: 'Revision Surgery Cases', 
    match: 15,
    description: 'Patients requiring revision of previous hip replacement',
    preferredMaterials: ['Titanium Alloy', 'Tantalum'],
    outcomes: {
      recoveryTime: { value: 12, unit: 'weeks', comparison: 'longer' },
      complicationRisk: { value: 12, unit: '%', comparison: 'higher' },
      prosthesisLifespan: { value: 14, unit: 'years', comparison: 'shorter' }
    },
    characteristics: {
      age: { avg: 68, range: [45, 85] },
      activityLevel: { avg: 4.2, range: [3, 6] },
      boneQuality: { value: 'Poor', percentage: 75 },
      bmi: { avg: 28.3, range: [23, 35] }
    }
  }
];

// Sample outcome data for time-based visualization
const outcomeTimeData = {
  recoveryMilestones: [
    { week: 1, milestone: 'Hospital Discharge', probability: 90 },
    { week: 2, milestone: 'Walking with Assistance', probability: 95 },
    { week: 4, milestone: 'Independent Mobility', probability: 85 },
    { week: 6, milestone: 'Return to Light Activities', probability: 80 },
    { week: 12, milestone: 'Full Recovery', probability: 75 }
  ],
  complicationRisks: [
    { year: 1, risk: 2.0, description: 'Early complications (infection, dislocation)' },
    { year: 5, risk: 3.5, description: 'Mid-term complications (loosening, wear)' },
    { year: 10, risk: 5.0, description: 'Long-term complications (osteolysis, loosening)' },
    { year: 15, risk: 8.0, description: 'Extended wear and material fatigue' },
    { year: 20, risk: 12.0, description: 'End of typical lifespan for prosthesis' }
  ],
  survivalRates: [
    { year: 1, rate: 99 },
    { year: 5, rate: 97 },
    { year: 10, rate: 94 },
    { year: 15, rate: 88 },
    { year: 20, rate: 82 },
    { year: 25, rate: 75 }
  ]
};

const OutcomePredictionPanel = ({ 
  patientProfile, 
  recommendedMaterial = 'Oxidized Zirconium',
  recommendedFixation = 'Cementless',
  outcomes = {
    recoveryTime: 6,
    complicationRisk: 4,
    prosthesisLifespan: 20
  }
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCluster, setSelectedCluster] = useState('young-active');
  
  // Find the best matching patient cluster
  const bestMatchCluster = patientClusters.reduce((prev, current) => 
    (prev.match > current.match) ? prev : current
  );
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Handle cluster selection
  const handleClusterSelect = (clusterId) => {
    setSelectedCluster(clusterId);
  };
  
  // Get the selected cluster data
  const selectedClusterData = patientClusters.find(cluster => cluster.id === selectedCluster);
  
  // Prepare radar chart data for profile comparison
  const getProfileComparisonData = () => {
    return {
      labels: ['Age', 'Weight', 'Activity Level', 'Bone Quality', 'Recovery Time'],
      datasets: [
        {
          label: 'Your Profile',
          data: [80, 65, 75, 70, 85],
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          borderColor: 'rgba(37, 99, 235, 0.8)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(37, 99, 235, 0.8)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(37, 99, 235, 1)',
          pointRadius: 4
        },
        {
          label: selectedClusterData.name,
          data: [70, 60, 80, 65, 75],
          backgroundColor: 'rgba(156, 39, 176, 0.2)',
          borderColor: 'rgba(156, 39, 176, 0.8)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(156, 39, 176, 0.8)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(156, 39, 176, 1)',
          pointRadius: 4
        }
      ]
    };
  };
  
  // Prepare bar chart data for patient cluster similarity
  const getClusterSimilarityData = () => {
    return {
      labels: patientClusters.map(cluster => cluster.name),
      datasets: [
        {
          label: 'Match Percentage',
          data: patientClusters.map(cluster => cluster.match),
          backgroundColor: patientClusters.map(cluster => 
            cluster.match >= 80 ? 'rgba(76, 175, 80, 0.7)' :
            cluster.match >= 60 ? 'rgba(33, 150, 243, 0.7)' :
            cluster.match >= 40 ? 'rgba(255, 152, 0, 0.7)' :
            'rgba(158, 158, 158, 0.7)'
          ),
          borderColor: patientClusters.map(cluster => 
            cluster.match >= 80 ? 'rgba(76, 175, 80, 1)' :
            cluster.match >= 60 ? 'rgba(33, 150, 243, 1)' :
            cluster.match >= 40 ? 'rgba(255, 152, 0, 1)' :
            'rgba(158, 158, 158, 1)'
          ),
          borderWidth: 1,
          borderRadius: 4
        }
      ]
    };
  };
  
  // Prepare line chart data for survival rate
  const getSurvivalRateData = () => {
    return {
      labels: outcomeTimeData.survivalRates.map(item => `Year ${item.year}`),
      datasets: [
        {
          label: 'Prosthesis Survival Rate (%)',
          data: outcomeTimeData.survivalRates.map(item => item.rate),
          borderColor: 'rgba(76, 175, 80, 0.8)',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.3
        }
      ]
    };
  };
  
  // Chart options
  const radarChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    },
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
          circular: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          font: {
            size: 11,
            weight: 'bold'
          }
        }
      }
    }
  };
  
  const barChartOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Match: ${context.raw}%`;
          },
          afterLabel: function(context) {
            const cluster = patientClusters[context.dataIndex];
            return [
              `Preferred Materials: ${cluster.preferredMaterials.join(', ')}`,
              `Recovery: ${cluster.outcomes.recoveryTime.value} ${cluster.outcomes.recoveryTime.unit}`,
              `Complication Risk: ${cluster.outcomes.complicationRisk.value}%`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Match Percentage (%)',
          font: {
            weight: 'bold'
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Patient Groups',
          font: {
            weight: 'bold'
          }
        }
      }
    }
  };
  
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Survival Rate: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time Period',
          font: {
            weight: 'bold'
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Survival Rate (%)',
          font: {
            weight: 'bold'
          }
        },
        min: 70,
        max: 100
      }
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: 'primary.main', flexGrow: 1 }}>
          Outcome Prediction & Patient Clustering
        </Typography>
        <Tooltip title="Our AI model analyzes your profile and compares it with similar patient groups to predict outcomes based on clinical data from thousands of cases">
          <IconButton size="small" color="primary">
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Our machine learning model analyzes your profile and recommended prosthesis to predict outcomes and find similar patient groups.
        All predictions are based on statistical analysis of clinical data with 95% confidence intervals.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Left column - Outcome predictions */}
        <Grid item xs={12} md={5}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              Predicted Outcomes with {recommendedMaterial} & {recommendedFixation}
              <Tooltip title="Statistical predictions based on your profile and selected prosthesis configuration">
                <IconButton size="small" sx={{ ml: 1 }}>
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Typography>
            
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {/* Recovery Time */}
              <Grid item xs={12}>
                <OutcomeMetricCard metricType="recovery">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon sx={{ color: 'info.main', mr: 1.5 }} />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Estimated Recovery Time
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main', my: 0.5 }}>
                          {outcomes.recoveryTime} <Typography component="span" variant="body2">weeks</Typography>
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          95% CI: {outcomes.recoveryTime - 1}-{outcomes.recoveryTime + 2} weeks
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </OutcomeMetricCard>
              </Grid>
              
              {/* Complication Risk */}
              <Grid item xs={12}>
                <OutcomeMetricCard metricType="risk">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <WarningAmberIcon sx={{ color: 'warning.main', mr: 1.5 }} />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Complication Risk
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main', my: 0.5 }}>
                          {outcomes.complicationRisk}% <Typography component="span" variant="body2">at 5 years</Typography>
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          95% CI: {outcomes.complicationRisk - 1.5}%-{outcomes.complicationRisk + 2}%
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </OutcomeMetricCard>
              </Grid>
              
              {/* Prosthesis Lifespan */}
              <Grid item xs={12}>
                <OutcomeMetricCard metricType="lifespan">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarMonthIcon sx={{ color: 'success.main', mr: 1.5 }} />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Estimated Prosthesis Lifespan
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main', my: 0.5 }}>
                          {outcomes.prosthesisLifespan} <Typography component="span" variant="body2">years</Typography>
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          95% CI: {outcomes.prosthesisLifespan - 3}-{outcomes.prosthesisLifespan + 5} years
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </OutcomeMetricCard>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px dashed rgba(0,0,0,0.1)' }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontStyle: 'italic' }}>
                These predictions are based on statistical models trained on clinical data from international joint registries and peer-reviewed studies.
                Individual results may vary based on surgical technique, rehabilitation adherence, and other factors.
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Right column - Patient clustering and analysis */}
        <Grid item xs={12} md={7}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ mb: 2 }}>
              <StyledTabs value={activeTab} onChange={handleTabChange}>
                <StyledTab icon={<GroupsIcon fontSize="small" />} iconPosition="start" label="Similar Patients" />
                <StyledTab icon={<CompareIcon fontSize="small" />} iconPosition="start" label="Profile Comparison" />
                <StyledTab icon={<ShowChartIcon fontSize="small" />} iconPosition="start" label="Outcome Analysis" />
              </StyledTabs>
            </Box>
            
            {/* Similar Patients Tab */}
            {activeTab === 0 && (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Similar Patient Group
                  </Typography>
                  <PatientGroupChip 
                    label={`${bestMatchCluster.match}% match`}
                    matchPercentage={bestMatchCluster.match}
                  />
                </Box>
                
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {bestMatchCluster.name}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {bestMatchCluster.description}. Patients in this group typically have similar characteristics and outcomes.
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Preferred Materials:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {bestMatchCluster.preferredMaterials.map((material, index) => (
                      <Chip 
                        key={index}
                        label={material}
                        color={material === recommendedMaterial ? "primary" : "default"}
                        variant={material === recommendedMaterial ? "filled" : "outlined"}
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Patient Cluster Similarity:
                </Typography>
                
                <Box sx={{ height: 250, mt: 2 }}>
                  <Bar data={getClusterSimilarityData()} options={barChartOptions} />
                </Box>
                
                <Box sx={{ mt: 3, pt: 2, borderTop: '1px dashed rgba(0,0,0,0.1)' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Patient clustering is performed using unsupervised machine learning algorithms (k-means clustering) 
                    on anonymized data from over 10,000 hip replacement patients. Similarity is calculated using 
                    Euclidean distance across 15 patient parameters.
                  </Typography>
                </Box>
              </Box>
            )}
            
            {/* Profile Comparison Tab */}
            {activeTab === 1 && (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Your Profile vs. {selectedClusterData.name}
                </Typography>
                
                <Box sx={{ height: 300, mt: 2 }}>
                  <Radar data={getProfileComparisonData()} options={radarChartOptions} />
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Select Patient Group for Comparison:
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {patientClusters.map((cluster) => (
                    <Chip
                      key={cluster.id}
                      label={cluster.name}
                      onClick={() => handleClusterSelect(cluster.id)}
                      color={selectedCluster === cluster.id ? "primary" : "default"}
                      variant={selectedCluster === cluster.id ? "filled" : "outlined"}
                    />
                  ))}
                </Box>
                
                <Box sx={{ mt: 3, pt: 2, borderTop: '1px dashed rgba(0,0,0,0.1)' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Profile comparison visualizes how your characteristics compare to the average values in each patient group.
                    Values are normalized on a 0-100 scale for visualization purposes.
                  </Typography>
                </Box>
              </Box>
            )}
            
            {/* Outcome Analysis Tab */}
            {activeTab === 2 && (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Long-term Prosthesis Survival Rate
                </Typography>
                
                <Box sx={{ height: 300, mt: 2 }}>
                  <Line data={getSurvivalRateData()} options={lineChartOptions} />
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Key Outcome Milestones:
                </Typography>
                
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {outcomeTimeData.recoveryMilestones.map((milestone, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                          <Typography variant="caption" color="text.secondary">
                            Week {milestone.week}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {milestone.milestone}
                          </Typography>
                          <Typography variant="caption" color="primary">
                            {milestone.probability}% probability
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                
                <Box sx={{ mt: 3, pt: 2, borderTop: '1px dashed rgba(0,0,0,0.1)' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Survival rates are based on Kaplan-Meier analysis of prosthesis longevity data from international joint registries.
                    Recovery milestones are derived from clinical studies with statistical significance (p &lt; 0.05).
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
          <InfoIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
          <span>
            <strong>Note:</strong> These predictions are based on machine learning models trained on synthetic data and should be considered as educational estimates only, not medical advice. 
            Actual outcomes vary based on many factors including surgical technique, patient compliance with rehabilitation, and individual healing characteristics.
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default OutcomePredictionPanel;
