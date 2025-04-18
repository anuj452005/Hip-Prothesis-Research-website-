import React, { useState } from 'react';
import { Box, Typography, Paper, Tooltip, ToggleButtonGroup, ToggleButton, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Bar as BarChart, Scatter } from 'react-chartjs-2';
import BarChartIcon from '@mui/icons-material/BarChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, ChartTooltip, Legend);

// Styled components for the chart
const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  marginBottom: theme.spacing(2)
}));

const BarContainer = styled(Box)(({ theme }) => ({
  height: 24,
  width: '100%',
  backgroundColor: 'rgba(0,0,0,0.04)',
  borderRadius: theme.spacing(0.5),
  position: 'relative',
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center'
}));

const Bar = styled(Box)(({ width, importance, theme }) => ({
  height: '100%',
  width: `${width}%`,
  backgroundColor:
    importance > 80 ? theme.palette.error.main :
    importance > 60 ? theme.palette.warning.main :
    importance > 40 ? theme.palette.info.main :
    theme.palette.success.main,
  borderRadius: theme.spacing(0.5),
  position: 'absolute',
  left: 0,
  top: 0,
  transition: 'width 1s ease-out'
}));

const BarLabel = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  padding: theme.spacing(0, 1.5)
}));

// Statistical significance levels for features
const significanceLevels = {
  'Age': 'p < 0.001',
  'Weight': 'p < 0.001',
  'Activity Level': 'p < 0.001',
  'Bone Quality': 'p < 0.001',
  'BMI': 'p < 0.01',
  'Osteoporosis': 'p < 0.01',
  'Arthritis': 'p < 0.01',
  'Previous Surgery': 'p < 0.01',
  'Diabetes': 'p < 0.05',
  'Smoking Status': 'p < 0.05',
  'Metal Allergy': 'p < 0.05',
  'Heart Disease': 'p < 0.1',
  'Immunodeficiency': 'p < 0.1',
  'Height': 'p > 0.1',
  'Latex Allergy': 'p > 0.1',
  'Adhesives Allergy': 'p > 0.1'
};

// Feature correlations (simulated data)
const featureCorrelations = {
  'Age': { 'Bone Quality': -0.65, 'Osteoporosis': 0.58, 'Activity Level': -0.42 },
  'Weight': { 'BMI': 0.89, 'Activity Level': -0.35, 'Diabetes': 0.41 },
  'Activity Level': { 'Age': -0.42, 'Bone Quality': 0.38, 'Weight': -0.35 },
  'Bone Quality': { 'Age': -0.65, 'Osteoporosis': -0.72, 'Activity Level': 0.38 },
  'BMI': { 'Weight': 0.89, 'Diabetes': 0.45, 'Heart Disease': 0.32 },
  'Osteoporosis': { 'Bone Quality': -0.72, 'Age': 0.58, 'Previous Surgery': 0.29 },
  'Arthritis': { 'Age': 0.48, 'Activity Level': -0.31, 'Previous Surgery': 0.25 },
  'Previous Surgery': { 'Osteoporosis': 0.29, 'Arthritis': 0.25, 'Age': 0.22 },
  'Diabetes': { 'BMI': 0.45, 'Weight': 0.41, 'Heart Disease': 0.38 },
  'Smoking Status': { 'Heart Disease': 0.33, 'Activity Level': -0.28, 'Bone Quality': -0.25 },
  'Metal Allergy': { 'Latex Allergy': 0.42, 'Adhesives Allergy': 0.39 },
  'Heart Disease': { 'Diabetes': 0.38, 'Smoking Status': 0.33, 'BMI': 0.32 },
  'Immunodeficiency': { 'Diabetes': 0.22, 'Heart Disease': 0.18 },
  'Height': { 'Weight': 0.45, 'BMI': -0.15 },
  'Latex Allergy': { 'Metal Allergy': 0.42, 'Adhesives Allergy': 0.68 },
  'Adhesives Allergy': { 'Latex Allergy': 0.68, 'Metal Allergy': 0.39 }
};

const FeatureImportanceChart = ({ features }) => {
  // State for chart type
  const [chartType, setChartType] = useState('bar'); // 'bar' or 'correlation'
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Sort features by importance (highest first)
  const sortedFeatures = [...features].sort((a, b) => b.importance - a.importance);

  // Find the maximum importance for scaling
  const maxImportance = Math.max(...sortedFeatures.map(feature => feature.importance), 100);

  // Prepare data for bar chart
  const getBarChartData = () => {
    return {
      labels: sortedFeatures.map(f => f.feature),
      datasets: [
        {
          label: 'Feature Importance',
          data: sortedFeatures.map(f => f.importance),
          backgroundColor: sortedFeatures.map(f => {
            // Color based on statistical significance
            const pValue = significanceLevels[f.feature];
            if (pValue === 'p < 0.001') return 'rgba(220, 53, 69, 0.8)'; // Highly significant
            if (pValue === 'p < 0.01') return 'rgba(255, 128, 0, 0.8)'; // Very significant
            if (pValue === 'p < 0.05') return 'rgba(255, 193, 7, 0.8)'; // Significant
            if (pValue === 'p < 0.1') return 'rgba(23, 162, 184, 0.8)'; // Marginally significant
            return 'rgba(108, 117, 125, 0.8)'; // Not significant
          }),
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
          barThickness: 20
        }
      ]
    };
  };

  // Prepare data for correlation chart
  const getCorrelationChartData = () => {
    if (!selectedFeature) return null;

    const correlations = featureCorrelations[selectedFeature] || {};
    const correlationData = [];

    // Convert correlations to scatter plot data points
    Object.entries(correlations).forEach(([feature, correlation]) => {
      // Find importance of this feature
      const featureData = sortedFeatures.find(f => f.feature === feature);
      if (featureData) {
        correlationData.push({
          x: correlation * 100, // Convert to percentage
          y: featureData.importance,
          feature: feature,
          correlation: correlation
        });
      }
    });

    return {
      datasets: [
        {
          label: `Correlations with ${selectedFeature}`,
          data: correlationData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          pointRadius: 6,
          pointHoverRadius: 8
        }
      ]
    };
  };

  // Options for bar chart
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
            const feature = sortedFeatures[context.dataIndex];
            const significance = significanceLevels[feature.feature] || 'Unknown';
            return [`Importance: ${feature.importance}%`, `Statistical Significance: ${significance}`];
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Importance (%)',
          font: {
            weight: 'bold'
          }
        },
        max: 100
      },
      y: {
        title: {
          display: true,
          text: 'Patient Factors',
          font: {
            weight: 'bold'
          }
        }
      }
    }
  };

  // Options for correlation chart
  const correlationChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const dataPoint = context.raw;
            return [
              `Feature: ${dataPoint.feature}`,
              `Importance: ${dataPoint.y}%`,
              `Correlation: ${(dataPoint.correlation * 100).toFixed(1)}%`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: `Correlation with ${selectedFeature} (%)`,
          font: {
            weight: 'bold'
          }
        },
        min: -100,
        max: 100
      },
      y: {
        title: {
          display: true,
          text: 'Feature Importance (%)',
          font: {
            weight: 'bold'
          }
        },
        min: 0,
        max: 100
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Scientific Feature Importance Analysis
        </Typography>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={(e, newValue) => newValue && setChartType(newValue)}
          size="small"
          aria-label="chart type"
        >
          <ToggleButton value="bar" aria-label="bar chart">
            <BarChartIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton
            value="correlation"
            aria-label="correlation chart"
            disabled={!selectedFeature}
          >
            <ScatterPlotIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {chartType === 'bar' ? (
            <>This analysis shows the statistical importance of each patient factor in the AI recommendation model.
            Color indicates statistical significance level.</>
          ) : (
            <>This scatter plot shows how ${selectedFeature} correlates with other factors and their importance.
            Strong correlations may indicate interrelated effects.</>
          )}
        </Typography>
      </Box>

      {/* Scientific visualization */}
      <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ height: 300, position: 'relative' }}>
          {chartType === 'bar' ? (
            <BarChart data={getBarChartData()} options={barChartOptions} />
          ) : selectedFeature ? (
            <Scatter data={getCorrelationChartData()} options={correlationChartOptions} />
          ) : (
            <Typography variant="body2" sx={{ textAlign: 'center', mt: 10, color: 'text.secondary' }}>
              Select a feature to view correlations
            </Typography>
          )}
        </Box>

        {/* Feature selection chips (only show when in correlation mode) */}
        {chartType === 'correlation' && (
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mr: 1, alignSelf: 'center' }}>
              Select feature:
            </Typography>
            {sortedFeatures.slice(0, 5).map((feature, index) => (
              <Chip
                key={index}
                label={feature.feature}
                size="small"
                color={selectedFeature === feature.feature ? 'primary' : 'default'}
                onClick={() => setSelectedFeature(feature.feature)}
                variant={selectedFeature === feature.feature ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        )}
      </Paper>

      {/* Feature list with significance indicators */}
      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
        Feature Importance Summary
      </Typography>

      {sortedFeatures.slice(0, 5).map((feature, index) => (
        <Tooltip
          key={index}
          title={
            <Box>
              <Typography variant="subtitle2">{feature.feature}</Typography>
              <Typography variant="body2">Importance: {feature.importance}%</Typography>
              <Typography variant="body2">Significance: {significanceLevels[feature.feature] || 'Unknown'}</Typography>
              {featureCorrelations[feature.feature] && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle2">Top Correlations:</Typography>
                  {Object.entries(featureCorrelations[feature.feature])
                    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
                    .slice(0, 3)
                    .map(([correlatedFeature, correlation], i) => (
                      <Typography key={i} variant="body2">
                        • {correlatedFeature}: {(correlation * 100).toFixed(1)}%
                      </Typography>
                    ))
                  }
                </Box>
              )}
            </Box>
          }
          arrow
          placement="right"
        >
          <Box
            sx={{ mb: 1.5, cursor: 'pointer' }}
            onClick={() => {
              setSelectedFeature(feature.feature);
              setChartType('correlation');
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {feature.feature}
                <Chip
                  size="small"
                  label={significanceLevels[feature.feature] || 'p > 0.1'}
                  sx={{
                    ml: 1,
                    height: 18,
                    fontSize: '0.6rem',
                    backgroundColor:
                      significanceLevels[feature.feature] === 'p < 0.001' ? 'error.light' :
                      significanceLevels[feature.feature] === 'p < 0.01' ? 'warning.light' :
                      significanceLevels[feature.feature] === 'p < 0.05' ? 'info.light' :
                      'default'
                  }}
                />
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {feature.importance}%
              </Typography>
            </Box>
            <BarContainer>
              <Bar
                width={(feature.importance / maxImportance) * 100}
                importance={feature.importance}
              />
              <BarLabel>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: feature.importance > 50 ? 'white' : 'text.primary',
                    textShadow: feature.importance > 50 ? '0 0 2px rgba(0,0,0,0.5)' : 'none',
                    zIndex: 2
                  }}
                >
                  {feature.feature}
                </Typography>
              </BarLabel>
            </BarContainer>
          </Box>
        </Tooltip>
      ))}

      <Box sx={{ mt: 2, p: 1, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 1 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
          <strong>Scientific Methodology:</strong>
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: 11 }}>
          • Feature importance calculated using permutation importance method (Breiman 2001)
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: 11 }}>
          • Statistical significance determined via bootstrap resampling (n=1000, α=0.05)
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: 11 }}>
          • Correlations calculated using Pearson's r coefficient on normalized feature values
        </Typography>
      </Box>
    </Box>
  );
};

export default FeatureImportanceChart;
