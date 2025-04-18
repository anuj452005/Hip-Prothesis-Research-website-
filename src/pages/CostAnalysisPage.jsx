import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import CostAnalysisCalculator from '../components/CostAnalysisCalculator';

const CostAnalysisPage = () => {
  // State for calculator inputs
  const [prosthesisType, setProsthesisType] = useState('thr');
  const [material, setMaterial] = useState('titanium');
  const [region, setRegion] = useState('northAmerica');
  const [calculatedCost, setCalculatedCost] = useState(null);

  // Base cost data (in USD)
  const baseCosts = {
    thr: {
      titanium: 3500,
      cobaltChromium: 3200,
      stainlessSteel: 2800,
      ceramic: 4200,
      polyethylene: 1200 // For the liner component only
    },
    phr: {
      titanium: 2800,
      cobaltChromium: 2500,
      stainlessSteel: 2200,
      ceramic: 3500
    },
    resurfacing: {
      cobaltChromium: 3800
    }
  };

  // Manufacturing cost multipliers
  const manufacturingMultipliers = {
    casting: 1.0,
    cnc: 1.4,
    forging: 1.2,
    printing: 1.6
  };

  // Region cost multipliers
  const regionMultipliers = {
    northAmerica: 1.0,
    europe: 0.9,
    asia: 0.7,
    australia: 1.1,
    southAmerica: 0.8,
    africa: 0.75
  };

  // Calculate cost when inputs change
  useEffect(() => {
    calculateCost();
  }, [prosthesisType, material, region]);

  const calculateCost = () => {
    // Check if the selected material is available for the selected prosthesis type
    if (!baseCosts[prosthesisType][material]) {
      setCalculatedCost('Material not available for this prosthesis type');
      return;
    }

    // Get base cost
    const baseCost = baseCosts[prosthesisType][material];

    // Apply region multiplier
    const regionAdjustedCost = baseCost * regionMultipliers[region];

    // Add manufacturing costs (assuming default manufacturing method for simplicity)
    const defaultManufacturingMethod = material === 'titanium' ? 'cnc' :
                                      material === 'ceramic' ? 'cnc' :
                                      material === 'polyethylene' ? 'casting' : 'forging';

    const totalCost = regionAdjustedCost * manufacturingMultipliers[defaultManufacturingMethod];

    // Add hospital and surgeon fees (simplified)
    const hospitalFees = 5000 * regionMultipliers[region];
    const surgeonFees = 4500 * regionMultipliers[region];

    const grandTotal = totalCost + hospitalFees + surgeonFees;

    setCalculatedCost(Math.round(grandTotal));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Hip Prosthesis Cost Analysis
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Understand the costs associated with different hip prosthesis options, materials, and procedures. Use our advanced cost calculator to estimate expenses based on your specific situation.
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Advanced Cost Analysis Calculator
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Our comprehensive calculator provides detailed cost projections including initial costs, long-term expenses, and potential revision surgeries.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <CostAnalysisCalculator />
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Basic Cost Estimator
        </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Comparative Cost Analysis
        </Typography>
        <div className="comparison-table-container">
          <table className="cost-comparison-table">
            <thead>
              <tr>
                <th>Prosthesis Type</th>
                <th>Material</th>
                <th>Manufacturing Method</th>
                <th>Component Cost</th>
                <th>Total Procedure Cost*</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Hip Replacement</td>
                <td>Titanium Alloy</td>
                <td>CNC Machining</td>
                <td>$3,500 - $4,900</td>
                <td>$13,000 - $18,000</td>
              </tr>
              <tr>
                <td>Total Hip Replacement</td>
                <td>Cobalt-Chromium</td>
                <td>Forging</td>
                <td>$3,200 - $3,800</td>
                <td>$12,500 - $16,500</td>
              </tr>
              <tr>
                <td>Total Hip Replacement</td>
                <td>Ceramic</td>
                <td>CNC Machining</td>
                <td>$4,200 - $5,900</td>
                <td>$14,000 - $19,000</td>
              </tr>
              <tr>
                <td>Partial Hip Replacement</td>
                <td>Stainless Steel</td>
                <td>Casting</td>
                <td>$2,200 - $2,800</td>
                <td>$11,000 - $14,000</td>
              </tr>
              <tr>
                <td>Hip Resurfacing</td>
                <td>Cobalt-Chromium</td>
                <td>Forging</td>
                <td>$3,800 - $4,600</td>
                <td>$13,000 - $17,000</td>
              </tr>
            </tbody>
          </table>
          <p className="table-note">* Total procedure cost includes component cost, hospital fees, surgeon fees, and other medical expenses. Costs vary by region and healthcare system.</p>
        </div>
      </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Factors Affecting Cost
        </Typography>
        <div className="calculator-container">
          <div className="calculator-inputs">
            <div className="input-group">
              <label htmlFor="prosthesis-type">Prosthesis Type:</label>
              <select
                id="prosthesis-type"
                value={prosthesisType}
                onChange={(e) => setProsthesisType(e.target.value)}
              >
                <option value="thr">Total Hip Replacement</option>
                <option value="phr">Partial Hip Replacement</option>
                <option value="resurfacing">Hip Resurfacing</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="material">Material:</label>
              <select
                id="material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              >
                <option value="titanium">Titanium Alloy</option>
                <option value="cobaltChromium">Cobalt-Chromium</option>
                <option value="stainlessSteel">Stainless Steel</option>
                <option value="ceramic">Ceramic</option>
                {prosthesisType === 'thr' && <option value="polyethylene">Polyethylene (Liner)</option>}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="region">Region:</label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="northAmerica">North America</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="australia">Australia/New Zealand</option>
                <option value="southAmerica">South America</option>
                <option value="africa">Africa</option>
              </select>
            </div>
          </div>

          <div className="calculator-results">
            <h3>Estimated Total Cost:</h3>
            <div className="cost-result">
              {typeof calculatedCost === 'number' ? `$${calculatedCost.toLocaleString()}` : calculatedCost}
            </div>
            <p className="cost-disclaimer">
              This is an estimate based on average costs. Actual costs may vary based on specific hospital, surgeon, insurance coverage, and other factors.
            </p>
          </div>
        </div>
      </Paper>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Key Cost Factors
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
          <div className="factor-card">
            <h3>Material Selection</h3>
            <p>Premium materials like ceramics and titanium alloys increase costs but may offer better longevity and performance.</p>
          </div>

          <div className="factor-card">
            <h3>Manufacturing Process</h3>
            <p>Advanced manufacturing techniques like CNC machining and 3D printing typically cost more than traditional casting methods.</p>
          </div>

          <div className="factor-card">
            <h3>Prosthesis Design</h3>
            <p>Custom or complex designs require additional engineering and manufacturing resources, increasing overall costs.</p>
          </div>

          <div className="factor-card">
            <h3>Geographic Region</h3>
            <p>Healthcare costs vary significantly by country and region due to differences in labor costs, regulations, and healthcare systems.</p>
          </div>

          <div className="factor-card">
            <h3>Hospital & Surgeon Fees</h3>
            <p>These typically represent the largest portion of the total cost and vary based on facility, surgeon experience, and location.</p>
          </div>

          <div className="factor-card">
            <h3>Insurance Coverage</h3>
            <p>Insurance policies may cover different percentages of the procedure cost, affecting out-of-pocket expenses for patients.</p>
          </div>
        </Box>
      </Paper>
    </Container>
  );
};

export default CostAnalysisPage;
