import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MaterialsPage = () => {
  const [selectedMaterial, setSelectedMaterial] = useState('titanium');

  // Sample data for stress-strain curves
  const stressStrainData = {
    titanium: {
      labels: [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0],
      datasets: [
        {
          label: 'Ti-6Al-4V Stress-Strain Curve',
          data: [0, 200, 400, 600, 800, 900, 950, 980, 1000, 1010, 1020],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    },
    cobaltChromium: {
      labels: [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0],
      datasets: [
        {
          label: 'Cobalt-Chromium Stress-Strain Curve',
          data: [0, 300, 500, 700, 850, 950, 1000, 1050, 1080, 1100, 1120],
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
        },
      ],
    },
    stainlessSteel: {
      labels: [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0],
      datasets: [
        {
          label: 'Stainless Steel Stress-Strain Curve',
          data: [0, 250, 450, 600, 700, 750, 780, 800, 820, 830, 840],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        },
      ],
    },
    ceramics: {
      labels: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5],
      datasets: [
        {
          label: 'Ceramics Stress-Strain Curve',
          data: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    },
    polyethylene: {
      labels: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      datasets: [
        {
          label: 'Polyethylene Stress-Strain Curve',
          data: [0, 5, 10, 15, 18, 20, 22, 23, 24, 25, 26],
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
        },
      ],
    },
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stress-Strain Curve',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Strain (%)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Stress (MPa)',
        },
      },
    },
  };

  // Material properties data
  const materialProperties = {
    titanium: {
      name: 'Titanium Alloy (Ti-6Al-4V)',
      density: '4.43 g/cm³',
      youngsModulus: '110-120 GPa',
      tensileStrength: '900-1200 MPa',
      yieldStrength: '800-1100 MPa',
      elongation: '10-15%',
      biocompatibility: 'Excellent',
      corrosionResistance: 'Excellent',
      wearResistance: 'Good',
      description: 'Titanium alloys are lightweight with excellent strength-to-weight ratio and superior biocompatibility. Ti-6Al-4V is the most commonly used titanium alloy in hip prostheses, particularly for femoral stems.',
      advantages: [
        'Excellent biocompatibility',
        'High strength-to-weight ratio',
        'Low elastic modulus (closer to bone)',
        'Excellent corrosion resistance',
        'MRI compatible'
      ],
      disadvantages: [
        'Lower wear resistance than cobalt-chromium',
        'Higher cost',
        'Poor shear strength'
      ],
      applications: 'Primarily used for femoral stems due to its favorable mechanical properties and biocompatibility.'
    },
    cobaltChromium: {
      name: 'Cobalt-Chromium Alloy',
      density: '8.3-9.2 g/cm³',
      youngsModulus: '210-250 GPa',
      tensileStrength: '900-1500 MPa',
      yieldStrength: '450-1000 MPa',
      elongation: '10-20%',
      biocompatibility: 'Good',
      corrosionResistance: 'Excellent',
      wearResistance: 'Excellent',
      description: 'Cobalt-chromium alloys offer excellent wear resistance and strength, making them ideal for bearing surfaces. Common alloys include CoCrMo and CoNiCrMo.',
      advantages: [
        'Superior wear resistance',
        'Excellent corrosion resistance',
        'High strength and hardness',
        'Good fatigue resistance'
      ],
      disadvantages: [
        'Higher elastic modulus (stress shielding)',
        'Potential for metal ion release',
        'Heavier than titanium'
      ],
      applications: 'Used for femoral heads and sometimes for femoral stems. Also used in metal-on-metal bearing surfaces.'
    },
    stainlessSteel: {
      name: 'Stainless Steel (316L)',
      density: '7.9-8.0 g/cm³',
      youngsModulus: '190-210 GPa',
      tensileStrength: '540-620 MPa',
      yieldStrength: '170-310 MPa',
      elongation: '30-40%',
      biocompatibility: 'Good',
      corrosionResistance: 'Good',
      wearResistance: 'Moderate',
      description: 'Stainless steel 316L is an iron-based alloy containing chromium, nickel, and molybdenum. It offers good mechanical properties at a lower cost than other alloys.',
      advantages: [
        'Lower cost',
        'Good mechanical properties',
        'Ease of manufacturing',
        'Good ductility'
      ],
      disadvantages: [
        'Lower corrosion resistance than Ti or CoCr',
        'Higher elastic modulus',
        'Potential for nickel sensitivity',
        'Lower fatigue strength'
      ],
      applications: 'Less commonly used now, but still found in some femoral stems and temporary implants.'
    },
    ceramics: {
      name: 'Ceramics (Alumina, Zirconia)',
      density: '3.9-6.0 g/cm³',
      youngsModulus: '300-400 GPa',
      tensileStrength: '300-700 MPa',
      yieldStrength: 'N/A (brittle)',
      elongation: '<0.1%',
      biocompatibility: 'Excellent',
      corrosionResistance: 'Excellent',
      wearResistance: 'Excellent',
      description: 'Ceramics like alumina (Al₂O₃) and zirconia (ZrO₂) offer exceptional hardness and wear resistance. Modern ceramics include alumina matrix composites with improved fracture toughness.',
      advantages: [
        'Excellent wear resistance',
        'Very low friction',
        'Excellent biocompatibility',
        'No metal ion release',
        'Scratch resistant'
      ],
      disadvantages: [
        'Brittle nature',
        'Risk of fracture',
        'Limited design flexibility',
        'Higher cost'
      ],
      applications: 'Used for femoral heads and acetabular liners in ceramic-on-ceramic or ceramic-on-polyethylene bearings.'
    },
    polyethylene: {
      name: 'Ultra-High Molecular Weight Polyethylene (UHMWPE)',
      density: '0.93-0.94 g/cm³',
      youngsModulus: '0.8-1.6 GPa',
      tensileStrength: '35-45 MPa',
      yieldStrength: '20-30 MPa',
      elongation: '350-525%',
      biocompatibility: 'Good',
      corrosionResistance: 'Excellent',
      wearResistance: 'Moderate to Good',
      description: 'UHMWPE is a polymer with extremely long chains that provide unique properties. Highly cross-linked polyethylene (HXLPE) is a modified version with improved wear resistance.',
      advantages: [
        'Low friction',
        'Shock absorption',
        'Lightweight',
        'Cost-effective',
        'No corrosion'
      ],
      disadvantages: [
        'Wear debris generation',
        'Oxidative degradation',
        'Lower mechanical strength',
        'Potential for deformation'
      ],
      applications: 'Primarily used for acetabular liners in metal-on-polyethylene or ceramic-on-polyethylene bearings.'
    }
  };

  return (
    <div className="materials-page">
      <h1>Material Analysis</h1>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <h2>Select Material</h2>
        <Button
          component={Link}
          to="/material-analysis"
          variant="contained"
          color="primary"
          startIcon={<CompareArrowsIcon />}
          sx={{ borderRadius: 2 }}
        >
          Advanced Material Comparison
        </Button>
      </Box>
      <div className="material-selector">
        <div className="material-buttons">
          <button
            className={selectedMaterial === 'titanium' ? 'active' : ''}
            onClick={() => setSelectedMaterial('titanium')}
          >
            Titanium Alloy
          </button>
          <button
            className={selectedMaterial === 'cobaltChromium' ? 'active' : ''}
            onClick={() => setSelectedMaterial('cobaltChromium')}
          >
            Cobalt-Chromium
          </button>
          <button
            className={selectedMaterial === 'stainlessSteel' ? 'active' : ''}
            onClick={() => setSelectedMaterial('stainlessSteel')}
          >
            Stainless Steel
          </button>
          <button
            className={selectedMaterial === 'ceramics' ? 'active' : ''}
            onClick={() => setSelectedMaterial('ceramics')}
          >
            Ceramics
          </button>
          <button
            className={selectedMaterial === 'polyethylene' ? 'active' : ''}
            onClick={() => setSelectedMaterial('polyethylene')}
          >
            Polyethylene
          </button>
        </div>
      </div>

      <div className="material-details">
        <h2>{materialProperties[selectedMaterial].name}</h2>

        <div className="material-content">
          <div className="material-properties">
            <h3>Physical Properties</h3>
            <table className="properties-table">
              <tbody>
                <tr>
                  <td>Density</td>
                  <td>{materialProperties[selectedMaterial].density}</td>
                </tr>
                <tr>
                  <td>Young's Modulus</td>
                  <td>{materialProperties[selectedMaterial].youngsModulus}</td>
                </tr>
                <tr>
                  <td>Tensile Strength</td>
                  <td>{materialProperties[selectedMaterial].tensileStrength}</td>
                </tr>
                <tr>
                  <td>Yield Strength</td>
                  <td>{materialProperties[selectedMaterial].yieldStrength}</td>
                </tr>
                <tr>
                  <td>Elongation</td>
                  <td>{materialProperties[selectedMaterial].elongation}</td>
                </tr>
                <tr>
                  <td>Biocompatibility</td>
                  <td>{materialProperties[selectedMaterial].biocompatibility}</td>
                </tr>
                <tr>
                  <td>Corrosion Resistance</td>
                  <td>{materialProperties[selectedMaterial].corrosionResistance}</td>
                </tr>
                <tr>
                  <td>Wear Resistance</td>
                  <td>{materialProperties[selectedMaterial].wearResistance}</td>
                </tr>
              </tbody>
            </table>

            <div className="material-description">
              <h3>Description</h3>
              <p>{materialProperties[selectedMaterial].description}</p>
            </div>

            <div className="material-advantages-disadvantages">
              <div className="advantages">
                <h3>Advantages</h3>
                <ul>
                  {materialProperties[selectedMaterial].advantages.map((advantage, index) => (
                    <li key={index}>{advantage}</li>
                  ))}
                </ul>
              </div>

              <div className="disadvantages">
                <h3>Disadvantages</h3>
                <ul>
                  {materialProperties[selectedMaterial].disadvantages.map((disadvantage, index) => (
                    <li key={index}>{disadvantage}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="material-applications">
              <h3>Applications</h3>
              <p>{materialProperties[selectedMaterial].applications}</p>
            </div>
          </div>

          <div className="stress-strain-visualization">
            <h3>Stress-Strain Visualization</h3>
            <div className="chart-container">
              <Line
                data={stressStrainData[selectedMaterial]}
                options={chartOptions}
              />
            </div>
          </div>
        </div>
      </div>

      <Box sx={{ mt: 5, p: 3, bgcolor: 'rgba(63, 81, 181, 0.05)', borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Need to compare multiple materials side by side?
        </Typography>
        <Typography variant="body1" paragraph>
          Our advanced Material Analysis tool allows you to scientifically compare properties, performance metrics, and stress-strain behavior of different materials simultaneously.
        </Typography>
        <Button
          component={Link}
          to="/material-analysis"
          variant="outlined"
          color="primary"
          startIcon={<CompareArrowsIcon />}
          sx={{ mt: 1 }}
        >
          Go to Advanced Material Comparison
        </Button>
      </Box>
    </div>
  );
};

export default MaterialsPage;
