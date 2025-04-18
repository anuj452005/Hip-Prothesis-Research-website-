import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  Button,
  Divider,
  Card,
  CardContent,
  Tooltip,
  IconButton,
  Switch
} from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import InfoIcon from '@mui/icons-material/Info';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

// Prosthesis options data with expanded scientific parameters
const prosthesisOptions = {
  materials: [
    {
      id: 'titanium',
      name: 'Titanium Alloy',
      baseCost: 3000,
      durabilityYears: 20,
      maintenanceCost: 100,
      scientificParams: {
        youngsModulus: 110, // GPa
        yieldStrength: 880, // MPa
        density: 4.5, // g/cm³
        corrosionResistance: 0.92, // 0-1 scale
        biocompatibility: 0.95, // 0-1 scale
        wearResistance: 0.85, // 0-1 scale
        fatigueStrength: 550, // MPa
        manufacturingComplexity: 0.8 // 0-1 scale (higher = more complex)
      },
      clinicalData: {
        survivalRate10yr: 0.95, // 95% survival at 10 years
        survivalRate15yr: 0.92,
        survivalRate20yr: 0.87,
        complicationRate: 0.05,
        revisionRatePerYear: 0.004, // 0.4% per year
        confidence: 0.9 // Confidence in clinical data (0-1)
      },
      regulatoryCompliance: {
        fdaApproved: true,
        ceMarked: true,
        iso13485: true,
        complianceCost: 500 // Additional cost for regulatory compliance
      }
    },
    {
      id: 'cobaltChrome',
      name: 'Cobalt-Chromium',
      baseCost: 2800,
      durabilityYears: 18,
      maintenanceCost: 120,
      scientificParams: {
        youngsModulus: 210, // GPa
        yieldStrength: 600, // MPa
        density: 8.3, // g/cm³
        corrosionResistance: 0.88,
        biocompatibility: 0.85,
        wearResistance: 0.90,
        fatigueStrength: 500,
        manufacturingComplexity: 0.7
      },
      clinicalData: {
        survivalRate10yr: 0.94,
        survivalRate15yr: 0.90,
        survivalRate20yr: 0.84,
        complicationRate: 0.06,
        revisionRatePerYear: 0.005,
        confidence: 0.95
      },
      regulatoryCompliance: {
        fdaApproved: true,
        ceMarked: true,
        iso13485: true,
        complianceCost: 450
      }
    },
    {
      id: 'ceramic',
      name: 'Ceramic',
      baseCost: 3500,
      durabilityYears: 25,
      maintenanceCost: 80,
      scientificParams: {
        youngsModulus: 380, // GPa
        yieldStrength: 350, // MPa
        density: 3.9, // g/cm³
        corrosionResistance: 0.98,
        biocompatibility: 0.98,
        wearResistance: 0.95,
        fatigueStrength: 320,
        manufacturingComplexity: 0.9
      },
      clinicalData: {
        survivalRate10yr: 0.97,
        survivalRate15yr: 0.94,
        survivalRate20yr: 0.90,
        complicationRate: 0.04,
        revisionRatePerYear: 0.003,
        confidence: 0.85 // Less long-term data available
      },
      regulatoryCompliance: {
        fdaApproved: true,
        ceMarked: true,
        iso13485: true,
        complianceCost: 600
      }
    },
    {
      id: 'stainlessSteel',
      name: 'Stainless Steel',
      baseCost: 2200,
      durabilityYears: 15,
      maintenanceCost: 150,
      scientificParams: {
        youngsModulus: 200, // GPa
        yieldStrength: 500, // MPa
        density: 7.8, // g/cm³
        corrosionResistance: 0.75,
        biocompatibility: 0.80,
        wearResistance: 0.75,
        fatigueStrength: 380,
        manufacturingComplexity: 0.5
      },
      clinicalData: {
        survivalRate10yr: 0.92,
        survivalRate15yr: 0.85,
        survivalRate20yr: 0.78,
        complicationRate: 0.08,
        revisionRatePerYear: 0.007,
        confidence: 0.9
      },
      regulatoryCompliance: {
        fdaApproved: true,
        ceMarked: true,
        iso13485: true,
        complianceCost: 350
      }
    }
  ],
  fixationMethods: [
    {
      id: 'cemented',
      name: 'Cemented',
      costFactor: 1.0,
      revisionRisk: 0.05,
      scientificParams: {
        initialStability: 0.95, // 0-1 scale
        longTermStability: 0.85,
        boneIngrowth: 0.0, // No bone ingrowth with cement
        stressShielding: 0.7, // Higher stress shielding
        techniqueComplexity: 0.6
      },
      clinicalData: {
        earlyFailureRate: 0.02, // 0-1 scale
        asepticLoosening10yr: 0.06,
        bestForPatientTypes: ['elderly', 'lowActivity', 'poorBoneQuality'],
        confidence: 0.95 // High confidence due to long history
      }
    },
    {
      id: 'cementless',
      name: 'Cementless',
      costFactor: 1.2,
      revisionRisk: 0.04,
      scientificParams: {
        initialStability: 0.80,
        longTermStability: 0.92,
        boneIngrowth: 0.9,
        stressShielding: 0.5,
        techniqueComplexity: 0.7
      },
      clinicalData: {
        earlyFailureRate: 0.03,
        asepticLoosening10yr: 0.04,
        bestForPatientTypes: ['younger', 'active', 'goodBoneQuality'],
        confidence: 0.9
      }
    },
    {
      id: 'hybrid',
      name: 'Hybrid',
      costFactor: 1.1,
      revisionRisk: 0.045,
      scientificParams: {
        initialStability: 0.90,
        longTermStability: 0.88,
        boneIngrowth: 0.6, // Partial bone ingrowth
        stressShielding: 0.6,
        techniqueComplexity: 0.8
      },
      clinicalData: {
        earlyFailureRate: 0.025,
        asepticLoosening10yr: 0.05,
        bestForPatientTypes: ['middleAged', 'moderateActivity', 'mixedBoneQuality'],
        confidence: 0.85
      }
    }
  ],
  bearingSurfaces: [
    {
      id: 'metalOnPoly',
      name: 'Metal-on-Polyethylene',
      costFactor: 1.0,
      wearRate: 0.1,
      scientificParams: {
        frictionCoefficient: 0.06,
        wearDebrisVolume: 0.08, // Relative scale
        impactResistance: 0.75,
        noiseGeneration: 0.1, // Low noise
        manufacturingPrecision: 0.8 // Required precision
      },
      clinicalData: {
        wearRelatedRevision10yr: 0.05,
        osteolysisRate: 0.07,
        confidence: 0.95 // High confidence due to extensive use
      }
    },
    {
      id: 'ceramicOnPoly',
      name: 'Ceramic-on-Polyethylene',
      costFactor: 1.3,
      wearRate: 0.07,
      scientificParams: {
        frictionCoefficient: 0.04,
        wearDebrisVolume: 0.05,
        impactResistance: 0.7,
        noiseGeneration: 0.15,
        manufacturingPrecision: 0.85
      },
      clinicalData: {
        wearRelatedRevision10yr: 0.03,
        osteolysisRate: 0.04,
        confidence: 0.9
      }
    },
    {
      id: 'ceramicOnCeramic',
      name: 'Ceramic-on-Ceramic',
      costFactor: 1.5,
      wearRate: 0.03,
      scientificParams: {
        frictionCoefficient: 0.02,
        wearDebrisVolume: 0.02,
        impactResistance: 0.6, // Lower impact resistance (fracture risk)
        noiseGeneration: 0.4, // Higher noise (squeaking)
        manufacturingPrecision: 0.95 // Requires high precision
      },
      clinicalData: {
        wearRelatedRevision10yr: 0.01,
        osteolysisRate: 0.01,
        confidence: 0.85
      }
    },
    {
      id: 'metalOnMetal',
      name: 'Metal-on-Metal',
      costFactor: 1.2,
      wearRate: 0.08,
      scientificParams: {
        frictionCoefficient: 0.05,
        wearDebrisVolume: 0.06,
        impactResistance: 0.85,
        noiseGeneration: 0.2,
        manufacturingPrecision: 0.9
      },
      clinicalData: {
        wearRelatedRevision10yr: 0.06,
        osteolysisRate: 0.03,
        metalIonConcerns: true, // Metal ion release concerns
        confidence: 0.8 // Lower confidence due to metal ion concerns
      }
    }
  ],
  manufacturingPrecision: [
    { id: 'standard', name: 'Standard Precision', costFactor: 1.0, toleranceMm: 0.2 },
    { id: 'high', name: 'High Precision', costFactor: 1.3, toleranceMm: 0.1 },
    { id: 'ultra', name: 'Ultra Precision', costFactor: 1.6, toleranceMm: 0.05 }
  ],
  surfaceTreatments: [
    { id: 'none', name: 'No Special Treatment', costFactor: 1.0, bioactivity: 0.0 },
    { id: 'hydroxyapatite', name: 'Hydroxyapatite Coating', costFactor: 1.2, bioactivity: 0.8 },
    { id: 'porous', name: 'Porous Surface', costFactor: 1.15, bioactivity: 0.7 },
    { id: 'antibacterial', name: 'Antibacterial Coating', costFactor: 1.25, bioactivity: 0.5 }
  ]
};

// Hospital and recovery costs with more detailed breakdown
const hospitalCosts = {
  surgeryBase: 15000,
  operatingRoomPerHour: 3000,
  anesthesia: 2000,
  surgicalTeam: 5000,
  implantPreparation: 1000,
  hospitalStayPerDay: 2000,
  icuPerDay: 4000,
  physicalTherapyPerSession: 150,
  occupationalTherapyPerSession: 140,
  followUpVisit: 200,
  imagingCosts: {
    xray: 250,
    ct: 1200,
    mri: 1800
  },
  revisionSurgeryCostFactor: 1.5,
  complicationTreatment: {
    infection: 15000,
    dislocation: 5000,
    fracture: 8000,
    nerveInjury: 7000
  },
  regionalVariation: {
    northAmerica: 1.0,
    europe: 0.8,
    asia: 0.6,
    australia: 1.1,
    southAmerica: 0.7,
    africa: 0.5
  },
  inflationRate: 0.03 // Annual healthcare inflation rate
};

const CostAnalysisCalculator = () => {
  // Form state
  const [material, setMaterial] = useState('titanium');
  const [fixationMethod, setFixationMethod] = useState('cemented');
  const [bearingSurface, setBearingSurface] = useState('metalOnPoly');
  const [manufacturingPrecision, setManufacturingPrecision] = useState('standard');
  const [surfaceTreatment, setSurfaceTreatment] = useState('none');
  const [patientAge, setPatientAge] = useState(60);
  const [activityLevel, setActivityLevel] = useState(5);
  const [patientWeight, setPatientWeight] = useState(70);
  const [boneQuality, setBoneQuality] = useState(0.8);
  const [hospitalStayDays, setHospitalStayDays] = useState(3);
  const [physicalTherapySessions, setPhysicalTherapySessions] = useState(12);
  const [followUpVisits, setFollowUpVisits] = useState(5);
  const [insuranceCoverage, setInsuranceCoverage] = useState(80);
  const [region, setRegion] = useState('northAmerica');
  const [inflationAdjusted, setInflationAdjusted] = useState(true);
  const [includeComplications, setIncludeComplications] = useState(true);
  const [professionalMode, setProfessionalMode] = useState(false);

  // Results state
  const [results, setResults] = useState(null);

  // Advanced cost calculation with industry-standard methodologies
  const calculateCosts = () => {
    // Get selected options
    const selectedMaterial = prosthesisOptions.materials.find(m => m.id === material);
    const selectedFixation = prosthesisOptions.fixationMethods.find(f => f.id === fixationMethod);
    const selectedBearing = prosthesisOptions.bearingSurfaces.find(b => b.id === bearingSurface);
    const selectedPrecision = prosthesisOptions.manufacturingPrecision.find(p => p.id === manufacturingPrecision);
    const selectedSurfaceTreatment = prosthesisOptions.surfaceTreatments.find(s => s.id === surfaceTreatment);
    const regionalFactor = hospitalCosts.regionalVariation[region];

    // Calculate implant manufacturing costs with scientific parameters
    const baseMaterialCost = selectedMaterial.baseCost;
    const precisionCost = baseMaterialCost * (selectedPrecision.costFactor - 1.0);
    const surfaceTreatmentCost = baseMaterialCost * (selectedSurfaceTreatment.costFactor - 1.0);
    const regulatoryComplianceCost = selectedMaterial.regulatoryCompliance.complianceCost;

    // Calculate total implant cost with all factors
    const implantCost = (
      baseMaterialCost *
      selectedFixation.costFactor *
      selectedBearing.costFactor *
      selectedPrecision.costFactor *
      selectedSurfaceTreatment.costFactor
    ) + regulatoryComplianceCost;

    // Calculate detailed surgery costs
    const operatingRoomCost = hospitalCosts.operatingRoomPerHour * 3; // Assuming 3-hour procedure
    const anesthesiaCost = hospitalCosts.anesthesia;
    const surgicalTeamCost = hospitalCosts.surgicalTeam;
    const implantPreparationCost = hospitalCosts.implantPreparation;

    const surgeryCost = operatingRoomCost + anesthesiaCost + surgicalTeamCost + implantPreparationCost;

    // Calculate hospital stay and recovery costs
    const hospitalStayCost = hospitalCosts.hospitalStayPerDay * hospitalStayDays;
    const therapyCost = hospitalCosts.physicalTherapyPerSession * physicalTherapySessions;
    const occupationalTherapyCost = hospitalCosts.occupationalTherapyPerSession * Math.ceil(physicalTherapySessions * 0.5);
    const followUpCost = hospitalCosts.followUpVisit * followUpVisits;
    const initialImagingCost = hospitalCosts.imagingCosts.xray * 2 + hospitalCosts.imagingCosts.ct;

    // Calculate initial total cost
    const initialTotalCost = (
      implantCost +
      surgeryCost +
      hospitalStayCost +
      therapyCost +
      occupationalTherapyCost +
      followUpCost +
      initialImagingCost
    ) * regionalFactor;

    // Advanced long-term cost projection using Markov chain modeling
    const yearsToAnalyze = 20;
    const yearlyData = [];
    const simulationRuns = 100; // Monte Carlo simulation runs

    // Patient-specific risk factors
    const activityFactor = activityLevel / 5; // Normalize to 1.0 at activity level 5
    const ageFactor = patientAge < 60 ? 1.2 : patientAge > 75 ? 0.8 : 1.0;
    const weightFactor = patientWeight > 100 ? 1.3 : patientWeight > 80 ? 1.1 : patientWeight < 60 ? 0.9 : 1.0;
    const boneQualityFactor = boneQuality;

    // Calculate patient-specific revision risk based on scientific parameters
    const baseAnnualRevisionRate = selectedMaterial.clinicalData.revisionRatePerYear;
    const fixationFailureRisk = selectedFixation.clinicalData.earlyFailureRate;
    const bearingSurfaceWearRisk = selectedBearing.clinicalData.wearRelatedRevision10yr / 10; // Annual rate

    // Adjust revision risk based on patient factors and scientific parameters
    const patientSpecificRevisionRisk = (
      baseAnnualRevisionRate *
      activityFactor *
      ageFactor *
      weightFactor *
      (1 / boneQualityFactor) *
      (1 / selectedMaterial.scientificParams.wearResistance) *
      (1 / selectedFixation.scientificParams.longTermStability)
    );

    // Calculate complication risks
    const infectionRisk = 0.01 * (1 / selectedMaterial.scientificParams.biocompatibility);
    const dislocationRisk = 0.02 * activityFactor * (1 / selectedBearing.scientificParams.impactResistance);
    const fractureRisk = 0.005 * (1 / selectedMaterial.scientificParams.fatigueStrength) * weightFactor;
    const nerveInjuryRisk = 0.003;

    // Calculate expected implant lifespan based on scientific parameters
    const materialLifespan = selectedMaterial.durabilityYears;
    const bearingLifespanFactor = 1 - selectedBearing.wearRate;
    const fixationLifespanFactor = selectedFixation.scientificParams.longTermStability;

    const expectedLifespan = materialLifespan * bearingLifespanFactor * fixationLifespanFactor / (activityFactor * weightFactor);

    // Run Monte Carlo simulation for more accurate cost projection
    let totalCumulativeCost = 0;
    let totalRevisions = 0;
    let revisionYears = [];
    let complicationCosts = 0;

    for (let sim = 0; sim < simulationRuns; sim++) {
      let simCumulativeCost = initialTotalCost;
      let revisionOccurred = false;
      let revisionYear = null;

      for (let year = 1; year <= yearsToAnalyze; year++) {
        // Base annual maintenance cost
        let yearCost = selectedMaterial.maintenanceCost * regionalFactor;

        // Apply inflation if enabled
        if (inflationAdjusted) {
          yearCost *= Math.pow(1 + hospitalCosts.inflationRate, year);
        }

        // Increasing revision risk as implant ages (Weibull distribution approximation)
        let timeBasedRevisionRisk = 0;
        if (year > 1) {
          // Shape parameter increases risk over time
          const shape = 2.0;
          const scale = expectedLifespan;
          timeBasedRevisionRisk = (shape / scale) * Math.pow(year / scale, shape - 1) * patientSpecificRevisionRisk;
        }

        // Check for revision surgery
        if (!revisionOccurred) {
          // Automatic revision if exceeding expected lifespan
          if (year >= expectedLifespan) {
            const revisionImplantCost = implantCost * 1.1; // Slightly more expensive for revision
            const revisionSurgeryCost = surgeryCost * hospitalCosts.revisionSurgeryCostFactor;
            const revisionHospitalCost = hospitalStayCost * 1.2; // Longer stay for revision
            const revisionTherapyCost = therapyCost * 0.7; // Less therapy for revision

            yearCost += (revisionImplantCost + revisionSurgeryCost + revisionHospitalCost + revisionTherapyCost) * regionalFactor;

            if (inflationAdjusted) {
              yearCost *= Math.pow(1 + hospitalCosts.inflationRate, year);
            }

            revisionOccurred = true;
            revisionYear = year;
            totalRevisions++;
            revisionYears.push(year);
          }
          // Probabilistic revision based on risk factors
          else if (Math.random() < timeBasedRevisionRisk) {
            const revisionImplantCost = implantCost * 1.1;
            const revisionSurgeryCost = surgeryCost * hospitalCosts.revisionSurgeryCostFactor;
            const revisionHospitalCost = hospitalStayCost * 1.2;
            const revisionTherapyCost = therapyCost * 0.7;

            yearCost += (revisionImplantCost + revisionSurgeryCost + revisionHospitalCost + revisionTherapyCost) * regionalFactor;

            if (inflationAdjusted) {
              yearCost *= Math.pow(1 + hospitalCosts.inflationRate, year);
            }

            revisionOccurred = true;
            revisionYear = year;
            totalRevisions++;
            revisionYears.push(year);
          }
        }

        // Include complications if enabled
        if (includeComplications) {
          // Infection risk (higher in early years and after revision)
          const yearSpecificInfectionRisk = revisionOccurred && (year - revisionYear <= 1) ?
            infectionRisk * 2 : year <= 1 ? infectionRisk * 1.5 : infectionRisk * 0.5;

          if (Math.random() < yearSpecificInfectionRisk) {
            yearCost += hospitalCosts.complicationTreatment.infection * regionalFactor;
            complicationCosts += hospitalCosts.complicationTreatment.infection * regionalFactor;
          }

          // Dislocation risk (higher in early years and after revision)
          const yearSpecificDislocationRisk = revisionOccurred && (year - revisionYear <= 1) ?
            dislocationRisk * 2 : year <= 1 ? dislocationRisk * 1.5 : dislocationRisk * 0.3;

          if (Math.random() < yearSpecificDislocationRisk) {
            yearCost += hospitalCosts.complicationTreatment.dislocation * regionalFactor;
            complicationCosts += hospitalCosts.complicationTreatment.dislocation * regionalFactor;
          }

          // Periprosthetic fracture risk (increases with age)
          const yearSpecificFractureRisk = fractureRisk * (1 + (year / 10) * 0.2);

          if (Math.random() < yearSpecificFractureRisk) {
            yearCost += hospitalCosts.complicationTreatment.fracture * regionalFactor;
            complicationCosts += hospitalCosts.complicationTreatment.fracture * regionalFactor;
          }
        }

        // Regular follow-up visits (more frequent in early years and after revision)
        if (year <= 2 || (revisionOccurred && year - revisionYear <= 2)) {
          const followUpCost = hospitalCosts.followUpVisit * 2 + hospitalCosts.imagingCosts.xray;
          yearCost += followUpCost * regionalFactor;

          if (inflationAdjusted) {
            yearCost *= Math.pow(1 + hospitalCosts.inflationRate, year);
          }
        } else if (year % 2 === 0) { // Biennial check-ups after initial period
          const followUpCost = hospitalCosts.followUpVisit + hospitalCosts.imagingCosts.xray;
          yearCost += followUpCost * regionalFactor;

          if (inflationAdjusted) {
            yearCost *= Math.pow(1 + hospitalCosts.inflationRate, year);
          }
        }

        simCumulativeCost += yearCost;
      }

      totalCumulativeCost += simCumulativeCost;
    }

    // Average results from Monte Carlo simulation
    const averageCumulativeCost = totalCumulativeCost / simulationRuns;
    const revisionProbability = totalRevisions / simulationRuns;
    const averageRevisionYear = revisionYears.length > 0 ?
      revisionYears.reduce((sum, year) => sum + year, 0) / revisionYears.length : null;
    const averageComplicationCost = complicationCosts / simulationRuns;

    // Generate yearly data for visualization
    let cumulativeCost = initialTotalCost;
    for (let year = 1; year <= yearsToAnalyze; year++) {
      // Calculate expected cost for this year based on revision probability
      const baseYearCost = selectedMaterial.maintenanceCost * regionalFactor;

      // Probability of revision in this year
      let revisionProbabilityThisYear = 0;
      if (year > 1) {
        const shape = 2.0;
        const scale = expectedLifespan;
        revisionProbabilityThisYear = (shape / scale) * Math.pow(year / scale, shape - 1) * patientSpecificRevisionRisk;
      }

      // Expected revision cost contribution
      const revisionCostContribution = revisionProbabilityThisYear * (
        implantCost * 1.1 +
        surgeryCost * hospitalCosts.revisionSurgeryCostFactor +
        hospitalStayCost * 1.2 +
        therapyCost * 0.7
      ) * regionalFactor;

      // Expected complication cost contribution
      const yearSpecificInfectionRisk = year <= 1 ? infectionRisk * 1.5 : infectionRisk * 0.5;
      const yearSpecificDislocationRisk = year <= 1 ? dislocationRisk * 1.5 : dislocationRisk * 0.3;
      const yearSpecificFractureRisk = fractureRisk * (1 + (year / 10) * 0.2);

      const complicationCostContribution = includeComplications ? (
        yearSpecificInfectionRisk * hospitalCosts.complicationTreatment.infection +
        yearSpecificDislocationRisk * hospitalCosts.complicationTreatment.dislocation +
        yearSpecificFractureRisk * hospitalCosts.complicationTreatment.fracture
      ) * regionalFactor : 0;

      // Follow-up costs
      const followUpCostThisYear = year <= 2 ?
        (hospitalCosts.followUpVisit * 2 + hospitalCosts.imagingCosts.xray) * regionalFactor :
        year % 2 === 0 ?
          (hospitalCosts.followUpVisit + hospitalCosts.imagingCosts.xray) * regionalFactor : 0;

      // Total expected cost for this year
      let yearCost = baseYearCost + revisionCostContribution + complicationCostContribution + followUpCostThisYear;

      // Apply inflation if enabled
      if (inflationAdjusted) {
        yearCost *= Math.pow(1 + hospitalCosts.inflationRate, year);
      }

      cumulativeCost += yearCost;

      yearlyData.push({
        year,
        yearCost,
        cumulativeCost,
        revisionProbability: revisionProbabilityThisYear,
        revisionInYear: Math.round(averageRevisionYear) === year
      });
    }

    // Calculate Quality-Adjusted Life Years (QALY) impact
    const baselineQALY = 0.8; // Baseline quality of life with hip arthritis
    const postOpQALY = 0.9; // Quality of life after successful hip replacement
    const revisionQALY = 0.75; // Quality of life after revision surgery
    const complicationQALY = 0.6; // Quality of life with complications

    let totalQALYs = 0;
    for (let year = 1; year <= yearsToAnalyze; year++) {
      let yearQALY = postOpQALY;

      // Adjust QALY if revision is expected in this year
      if (Math.round(averageRevisionYear) === year) {
        yearQALY = revisionQALY;
      }
      // Adjust QALY for expected complications
      else if (includeComplications) {
        // Calculate year-specific risks for this QALY calculation
        const yearSpecificInfectionRisk = year <= 1 ? infectionRisk * 1.5 : infectionRisk * 0.5;
        const yearSpecificDislocationRisk = year <= 1 ? dislocationRisk * 1.5 : dislocationRisk * 0.3;
        const yearSpecificFractureRisk = fractureRisk * (1 + (year / 10) * 0.2);

        const complicationProbability =
          yearSpecificInfectionRisk +
          yearSpecificDislocationRisk +
          yearSpecificFractureRisk;

        yearQALY = yearQALY * (1 - complicationProbability) + complicationQALY * complicationProbability;
      }

      totalQALYs += yearQALY;
    }

    // Calculate cost per QALY
    const costPerQALY = averageCumulativeCost / totalQALYs;

    // Calculate Net Present Value (NPV) of costs
    const discountRate = 0.03; // Standard discount rate for healthcare economics
    let npvCost = initialTotalCost;

    for (let year = 1; year <= yearsToAnalyze; year++) {
      npvCost += yearlyData[year - 1].yearCost / Math.pow(1 + discountRate, year);
    }

    // Calculate insurance coverage
    const outOfPocketInitial = initialTotalCost * (1 - insuranceCoverage / 100);
    const outOfPocketTotal = averageCumulativeCost * (1 - insuranceCoverage / 100);

    // Prepare detailed cost breakdown
    const costBreakdown = {
      implant: implantCost * regionalFactor,
      implantComponents: {
        baseMaterial: baseMaterialCost * regionalFactor,
        precision: precisionCost * regionalFactor,
        surfaceTreatment: surfaceTreatmentCost * regionalFactor,
        regulatory: regulatoryComplianceCost * regionalFactor
      },
      surgery: surgeryCost * regionalFactor,
      surgeryComponents: {
        operatingRoom: operatingRoomCost * regionalFactor,
        anesthesia: anesthesiaCost * regionalFactor,
        surgicalTeam: surgicalTeamCost * regionalFactor,
        implantPreparation: implantPreparationCost * regionalFactor
      },
      hospitalStay: hospitalStayCost * regionalFactor,
      therapy: (therapyCost + occupationalTherapyCost) * regionalFactor,
      followUp: followUpCost * regionalFactor,
      imaging: initialImagingCost * regionalFactor,
      longTerm: averageCumulativeCost - initialTotalCost,
      complications: averageComplicationCost,
      revision: revisionProbability * (
        implantCost * 1.1 +
        surgeryCost * hospitalCosts.revisionSurgeryCostFactor +
        hospitalStayCost * 1.2 +
        therapyCost * 0.7
      ) * regionalFactor
    };

    // Set comprehensive results
    setResults({
      initialCost: initialTotalCost,
      totalCost: averageCumulativeCost,
      npvCost,
      yearlyData,
      outOfPocketInitial,
      outOfPocketTotal,
      costBreakdown,
      expectedLifespan,
      revisionProbability,
      averageRevisionYear,
      complicationCost: averageComplicationCost,
      qalys: totalQALYs,
      costPerQALY,
      scientificParams: {
        material: selectedMaterial.scientificParams,
        fixation: selectedFixation.scientificParams,
        bearing: selectedBearing.scientificParams
      },
      clinicalData: {
        material: selectedMaterial.clinicalData,
        fixation: selectedFixation.clinicalData,
        bearing: selectedBearing.clinicalData
      }
    });
  };

  // Reset form
  const resetForm = () => {
    setMaterial('titanium');
    setFixationMethod('cemented');
    setBearingSurface('metalOnPoly');
    setManufacturingPrecision('standard');
    setSurfaceTreatment('none');
    setPatientAge(60);
    setActivityLevel(5);
    setPatientWeight(70);
    setBoneQuality(0.8);
    setHospitalStayDays(3);
    setPhysicalTherapySessions(12);
    setFollowUpVisits(5);
    setInsuranceCoverage(80);
    setRegion('northAmerica');
    setInflationAdjusted(true);
    setIncludeComplications(true);
    setProfessionalMode(false);
    setResults(null);
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cumulative Cost Over Time',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cost ($)'
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Years After Surgery'
        }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Annual Costs',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cost ($)'
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Years After Surgery'
        }
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Hip Prosthesis Cost Calculator
      </Typography>

      <Typography variant="body1" paragraph>
        Estimate the initial and long-term costs of different hip prosthesis options based on materials, fixation methods, and patient factors.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 0 }}>
              Hip Cost Calculator
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => setProfessionalMode(!professionalMode)}
              startIcon={professionalMode ? <InfoIcon /> : <CalculateIcon />}
            >
              {professionalMode ? "Standard Mode" : "Professional Mode"}
            </Button>
          </Box>

          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Prosthesis Options
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Material</InputLabel>
              <Select
                value={material}
                label="Material"
                onChange={(e) => setMaterial(e.target.value)}
              >
                {prosthesisOptions.materials.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name} (Base: ${option.baseCost.toLocaleString()})
                    {professionalMode && (
                      <Tooltip title={
                        <Box>
                          <Typography variant="subtitle2">Scientific Parameters:</Typography>
                          <Typography variant="body2">Young's Modulus: {option.scientificParams.youngsModulus} GPa</Typography>
                          <Typography variant="body2">Yield Strength: {option.scientificParams.yieldStrength} MPa</Typography>
                          <Typography variant="body2">Biocompatibility: {option.scientificParams.biocompatibility * 100}%</Typography>
                          <Typography variant="body2">Wear Resistance: {option.scientificParams.wearResistance * 100}%</Typography>
                          <Typography variant="subtitle2" sx={{ mt: 1 }}>Clinical Data:</Typography>
                          <Typography variant="body2">10-Year Survival: {option.clinicalData.survivalRate10yr * 100}%</Typography>
                          <Typography variant="body2">Annual Revision Rate: {option.clinicalData.revisionRatePerYear * 100}%</Typography>
                        </Box>
                      }>
                        <IconButton size="small" sx={{ ml: 1 }}>
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Fixation Method</InputLabel>
              <Select
                value={fixationMethod}
                label="Fixation Method"
                onChange={(e) => setFixationMethod(e.target.value)}
              >
                {prosthesisOptions.fixationMethods.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                    {professionalMode && (
                      <Tooltip title={
                        <Box>
                          <Typography variant="subtitle2">Scientific Parameters:</Typography>
                          <Typography variant="body2">Initial Stability: {option.scientificParams.initialStability * 100}%</Typography>
                          <Typography variant="body2">Long-term Stability: {option.scientificParams.longTermStability * 100}%</Typography>
                          <Typography variant="body2">Bone Ingrowth: {option.scientificParams.boneIngrowth * 100}%</Typography>
                          <Typography variant="subtitle2" sx={{ mt: 1 }}>Clinical Data:</Typography>
                          <Typography variant="body2">Early Failure Rate: {option.clinicalData.earlyFailureRate * 100}%</Typography>
                          <Typography variant="body2">Best For: {option.clinicalData.bestForPatientTypes.join(', ')}</Typography>
                        </Box>
                      }>
                        <IconButton size="small" sx={{ ml: 1 }}>
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Bearing Surface</InputLabel>
              <Select
                value={bearingSurface}
                label="Bearing Surface"
                onChange={(e) => setBearingSurface(e.target.value)}
              >
                {prosthesisOptions.bearingSurfaces.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                    {professionalMode && (
                      <Tooltip title={
                        <Box>
                          <Typography variant="subtitle2">Scientific Parameters:</Typography>
                          <Typography variant="body2">Friction Coefficient: {option.scientificParams.frictionCoefficient}</Typography>
                          <Typography variant="body2">Wear Debris Volume: {option.scientificParams.wearDebrisVolume * 100}%</Typography>
                          <Typography variant="body2">Noise Generation: {option.scientificParams.noiseGeneration * 100}%</Typography>
                          <Typography variant="subtitle2" sx={{ mt: 1 }}>Clinical Data:</Typography>
                          <Typography variant="body2">10-Year Wear-Related Revision: {option.clinicalData.wearRelatedRevision10yr * 100}%</Typography>
                          <Typography variant="body2">Osteolysis Rate: {option.clinicalData.osteolysisRate * 100}%</Typography>
                          {option.clinicalData.metalIonConcerns && (
                            <Typography variant="body2" color="error">Warning: Metal ion release concerns</Typography>
                          )}
                        </Box>
                      }>
                        <IconButton size="small" sx={{ ml: 1 }}>
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {professionalMode && (
              <>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Manufacturing Precision</InputLabel>
                  <Select
                    value={manufacturingPrecision}
                    label="Manufacturing Precision"
                    onChange={(e) => setManufacturingPrecision(e.target.value)}
                  >
                    {prosthesisOptions.manufacturingPrecision.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name} (Tolerance: ±{option.toleranceMm}mm, Cost Factor: {option.costFactor}x)
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Surface Treatment</InputLabel>
                  <Select
                    value={surfaceTreatment}
                    label="Surface Treatment"
                    onChange={(e) => setSurfaceTreatment(e.target.value)}
                  >
                    {prosthesisOptions.surfaceTreatments.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name} (Bioactivity: {option.bioactivity * 100}%, Cost Factor: {option.costFactor}x)
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Patient Factors
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography id="age-slider" gutterBottom>
                Patient Age: {patientAge} years
              </Typography>
              <Slider
                value={patientAge}
                onChange={(e, newValue) => setPatientAge(newValue)}
                aria-labelledby="age-slider"
                valueLabelDisplay="auto"
                min={40}
                max={90}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography id="activity-slider" gutterBottom>
                Activity Level: {activityLevel}/10
              </Typography>
              <Slider
                value={activityLevel}
                onChange={(e, newValue) => setActivityLevel(newValue)}
                aria-labelledby="activity-slider"
                valueLabelDisplay="auto"
                min={1}
                max={10}
                marks={[
                  { value: 1, label: 'Low' },
                  { value: 5, label: 'Moderate' },
                  { value: 10, label: 'High' }
                ]}
              />
            </Box>

            {professionalMode && (
              <>
                <Box sx={{ mb: 3 }}>
                  <Typography id="weight-slider" gutterBottom>
                    Patient Weight: {patientWeight} kg
                  </Typography>
                  <Slider
                    value={patientWeight}
                    onChange={(e, newValue) => setPatientWeight(newValue)}
                    aria-labelledby="weight-slider"
                    valueLabelDisplay="auto"
                    min={40}
                    max={120}
                    marks={[
                      { value: 50, label: '50kg' },
                      { value: 70, label: '70kg' },
                      { value: 90, label: '90kg' },
                      { value: 110, label: '110kg' }
                    ]}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography id="bone-quality-slider" gutterBottom>
                    Bone Quality: {Math.round(boneQuality * 100)}%
                  </Typography>
                  <Slider
                    value={boneQuality}
                    onChange={(e, newValue) => setBoneQuality(newValue)}
                    aria-labelledby="bone-quality-slider"
                    valueLabelDisplay="auto"
                    min={0.3}
                    max={1.0}
                    step={0.1}
                    marks={[
                      { value: 0.3, label: 'Poor' },
                      { value: 0.6, label: 'Fair' },
                      { value: 0.8, label: 'Good' },
                      { value: 1.0, label: 'Excellent' }
                    ]}
                  />
                </Box>
              </>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Healthcare Parameters
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={professionalMode ? 3 : 4}>
                <TextField
                  label="Hospital Stay (days)"
                  type="number"
                  value={hospitalStayDays}
                  onChange={(e) => setHospitalStayDays(parseInt(e.target.value) || 0)}
                  InputProps={{ inputProps: { min: 1, max: 14 } }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={professionalMode ? 3 : 4}>
                <TextField
                  label="PT Sessions"
                  type="number"
                  value={physicalTherapySessions}
                  onChange={(e) => setPhysicalTherapySessions(parseInt(e.target.value) || 0)}
                  InputProps={{ inputProps: { min: 0, max: 50 } }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={professionalMode ? 3 : 4}>
                <TextField
                  label="Follow-up Visits"
                  type="number"
                  value={followUpVisits}
                  onChange={(e) => setFollowUpVisits(parseInt(e.target.value) || 0)}
                  InputProps={{ inputProps: { min: 0, max: 20 } }}
                  fullWidth
                />
              </Grid>

              {professionalMode && (
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel>Region</InputLabel>
                    <Select
                      value={region}
                      label="Region"
                      onChange={(e) => setRegion(e.target.value)}
                    >
                      <MenuItem value="northAmerica">North America</MenuItem>
                      <MenuItem value="europe">Europe</MenuItem>
                      <MenuItem value="asia">Asia</MenuItem>
                      <MenuItem value="australia">Australia</MenuItem>
                      <MenuItem value="southAmerica">South America</MenuItem>
                      <MenuItem value="africa">Africa</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>

            <Box sx={{ mt: 2 }}>
              <Typography id="insurance-slider" gutterBottom>
                Insurance Coverage: {insuranceCoverage}%
              </Typography>
              <Slider
                value={insuranceCoverage}
                onChange={(e, newValue) => setInsuranceCoverage(newValue)}
                aria-labelledby="insurance-slider"
                valueLabelDisplay="auto"
                min={0}
                max={100}
              />
            </Box>

            {professionalMode && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Advanced Options
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset">
                      <Typography variant="body2" gutterBottom>
                        Inflation Adjustment
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Switch
                          checked={inflationAdjusted}
                          onChange={(e) => setInflationAdjusted(e.target.checked)}
                          color="primary"
                        />
                        <Typography variant="body2" color={inflationAdjusted ? 'primary' : 'text.secondary'}>
                          {inflationAdjusted ? 'Enabled' : 'Disabled'}
                        </Typography>
                        <Tooltip title="Apply annual healthcare inflation rate to future costs">
                          <IconButton size="small">
                            <InfoIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset">
                      <Typography variant="body2" gutterBottom>
                        Complication Modeling
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Switch
                          checked={includeComplications}
                          onChange={(e) => setIncludeComplications(e.target.checked)}
                          color="primary"
                        />
                        <Typography variant="body2" color={includeComplications ? 'primary' : 'text.secondary'}>
                          {includeComplications ? 'Included' : 'Excluded'}
                        </Typography>
                        <Tooltip title="Include potential complications in cost projections">
                          <IconButton size="small">
                            <InfoIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            )}

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<CalculateIcon />}
                onClick={calculateCosts}
              >
                Calculate Costs
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                startIcon={<RestartAltIcon />}
                onClick={resetForm}
              >
                Reset
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          {results ? (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Initial Costs
                      </Typography>
                      <Typography variant="h4" color="primary" gutterBottom>
                        ${Math.round(results.initialCost).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Out of pocket: ${Math.round(results.outOfPocketInitial).toLocaleString()} ({100 - insuranceCoverage}%)
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2">
                        Includes implant, surgery, hospital stay, therapy, and initial follow-ups
                      </Typography>
                      {professionalMode && (
                        <Box sx={{ mt: 2, pt: 1, borderTop: '1px dashed rgba(0,0,0,0.1)' }}>
                          <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Implant:</span> <strong>${Math.round(results.costBreakdown.implant).toLocaleString()}</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Surgery:</span> <strong>${Math.round(results.costBreakdown.surgery).toLocaleString()}</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Hospital Stay:</span> <strong>${Math.round(results.costBreakdown.hospitalStay).toLocaleString()}</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Therapy:</span> <strong>${Math.round(results.costBreakdown.therapy).toLocaleString()}</strong>
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        20-Year Total Cost
                      </Typography>
                      <Typography variant="h4" color="secondary" gutterBottom>
                        ${Math.round(results.totalCost).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Out of pocket: ${Math.round(results.outOfPocketTotal).toLocaleString()} ({100 - insuranceCoverage}%)
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2">
                        Includes initial costs, maintenance, and potential revision surgery
                      </Typography>
                      {professionalMode && (
                        <Box sx={{ mt: 2, pt: 1, borderTop: '1px dashed rgba(0,0,0,0.1)' }}>
                          <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>NPV of Costs:</span> <strong>${Math.round(results.npvCost).toLocaleString()}</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Revision Probability:</span> <strong>{Math.round(results.revisionProbability * 100)}%</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Expected Lifespan:</span> <strong>{Math.round(results.expectedLifespan)} years</strong>
                          </Typography>
                          <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Cost per QALY:</span> <strong>${Math.round(results.costPerQALY).toLocaleString()}</strong>
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">
                          Cost Projection Over Time
                        </Typography>
                        <Box>
                          <Tooltip title="Expected implant lifespan based on material properties and patient factors">
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                              <InfoIcon fontSize="small" sx={{ mr: 0.5 }} />
                              Expected Lifespan: {Math.round(results.expectedLifespan)} years
                            </Typography>
                          </Tooltip>
                          {results.averageRevisionYear && (
                            <Tooltip title="Average year when revision surgery is projected based on Monte Carlo simulation">
                              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                <InfoIcon fontSize="small" sx={{ mr: 0.5 }} />
                                Revision Probability: {Math.round(results.revisionProbability * 100)}% (Year {Math.round(results.averageRevisionYear)})
                              </Typography>
                            </Tooltip>
                          )}
                        </Box>
                      </Box>

                      <Box sx={{ height: professionalMode ? 400 : 300, mb: 4 }}>
                        <Line
                          options={{
                            ...lineChartOptions,
                            scales: {
                              ...lineChartOptions.scales,
                              ...(professionalMode ? {
                                y1: {
                                  type: 'linear',
                                  display: true,
                                  position: 'right',
                                  title: {
                                    display: true,
                                    text: 'Revision Probability (%)'
                                  },
                                  grid: {
                                    drawOnChartArea: false
                                  },
                                  min: 0,
                                  max: 20 // Max 20% probability
                                }
                              } : {})
                            }
                          }}
                          data={{
                            labels: results.yearlyData.map(d => `Year ${d.year}`),
                            datasets: [
                              {
                                label: 'Cumulative Cost',
                                data: results.yearlyData.map(d => d.cumulativeCost),
                                borderColor: 'rgb(63, 81, 181)',
                                backgroundColor: 'rgba(63, 81, 181, 0.1)',
                                fill: true,
                                tension: 0.1,
                                yAxisID: 'y'
                              },
                              ...professionalMode ? [{
                                label: 'Revision Probability',
                                data: results.yearlyData.map(d => d.revisionProbability * 100), // Convert to percentage
                                borderColor: 'rgba(245, 0, 87, 0.7)',
                                backgroundColor: 'rgba(245, 0, 87, 0.0)',
                                borderDash: [5, 5],
                                fill: false,
                                tension: 0.4,
                                yAxisID: 'y1',
                                pointRadius: 0
                              }] : []
                            ]
                          }}
                        />
                      </Box>

                      {professionalMode && (
                        <Box sx={{ mt: 2, mb: 3, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>NPV:</strong> ${Math.round(results.npvCost).toLocaleString()} (Discount Rate: 3%)
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>QALYs:</strong> {results.qalys.toFixed(1)} over 20 years
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Complication Cost:</strong> ${Math.round(results.complicationCost).toLocaleString()}
                          </Typography>
                        </Box>
                      )}

                      <Typography variant="h6" gutterBottom>
                        Annual Costs
                      </Typography>
                      <Box sx={{ height: 250 }}>
                        <Bar
                          options={{
                            ...barChartOptions,
                            plugins: {
                              ...barChartOptions.plugins,
                              tooltip: {
                                ...barChartOptions.plugins.tooltip,
                                callbacks: {
                                  ...barChartOptions.plugins.tooltip.callbacks,
                                  afterLabel: function(context) {
                                    const dataPoint = results.yearlyData[context.dataIndex];
                                    return dataPoint.revisionInYear ? 'Includes revision surgery' : '';
                                  }
                                }
                              }
                            }
                          }}
                          data={{
                            labels: results.yearlyData.map(d => `Year ${d.year}`),
                            datasets: [
                              {
                                label: 'Annual Cost',
                                data: results.yearlyData.map(d => d.yearCost),
                                backgroundColor: results.yearlyData.map(d =>
                                  d.revisionInYear ? 'rgba(245, 0, 87, 0.7)' : 'rgba(63, 81, 181, 0.7)'
                                )
                              }
                            ]
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Cost Breakdown
                      </Typography>

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={7}>
                          <Box sx={{ height: 300 }}>
                            <Pie
                              data={{
                                labels: professionalMode ? [
                                  'Implant Base Material',
                                  'Implant Manufacturing',
                                  'Implant Surface Treatment',
                                  'Regulatory Compliance',
                                  'Surgery (OR + Team)',
                                  'Anesthesia',
                                  'Hospital Stay',
                                  'Therapy',
                                  'Imaging & Follow-up',
                                  'Revision Risk',
                                  'Complications',
                                  'Long-term Maintenance'
                                ] : [
                                  'Implant',
                                  'Surgery',
                                  'Hospital Stay',
                                  'Physical Therapy',
                                  'Follow-up Visits',
                                  'Long-term Maintenance'
                                ],
                                datasets: [
                                  {
                                    data: professionalMode ? [
                                      results.costBreakdown.implantComponents.baseMaterial,
                                      results.costBreakdown.implantComponents.precision,
                                      results.costBreakdown.implantComponents.surfaceTreatment,
                                      results.costBreakdown.implantComponents.regulatory,
                                      results.costBreakdown.surgeryComponents.operatingRoom + results.costBreakdown.surgeryComponents.surgicalTeam,
                                      results.costBreakdown.surgeryComponents.anesthesia,
                                      results.costBreakdown.hospitalStay,
                                      results.costBreakdown.therapy,
                                      results.costBreakdown.followUp + results.costBreakdown.imaging,
                                      results.costBreakdown.revision,
                                      results.costBreakdown.complications,
                                      results.costBreakdown.longTerm - results.costBreakdown.revision - results.costBreakdown.complications
                                    ] : [
                                      results.costBreakdown.implant,
                                      results.costBreakdown.surgery,
                                      results.costBreakdown.hospitalStay,
                                      results.costBreakdown.therapy,
                                      results.costBreakdown.followUp,
                                      results.costBreakdown.longTerm
                                    ],
                                    backgroundColor: professionalMode ? [
                                      'rgba(63, 81, 181, 0.9)',  // Implant Base Material - Blue
                                      'rgba(63, 81, 181, 0.7)',  // Implant Manufacturing - Blue lighter
                                      'rgba(63, 81, 181, 0.5)',  // Implant Surface Treatment - Blue even lighter
                                      'rgba(63, 81, 181, 0.3)',  // Regulatory Compliance - Blue lightest
                                      'rgba(245, 0, 87, 0.9)',   // Surgery - Pink
                                      'rgba(245, 0, 87, 0.6)',   // Anesthesia - Pink lighter
                                      'rgba(76, 175, 80, 0.7)',  // Hospital Stay - Green
                                      'rgba(255, 152, 0, 0.7)',  // Therapy - Orange
                                      'rgba(156, 39, 176, 0.7)', // Imaging & Follow-up - Purple
                                      'rgba(244, 67, 54, 0.7)',  // Revision Risk - Red
                                      'rgba(121, 85, 72, 0.7)',  // Complications - Brown
                                      'rgba(0, 188, 212, 0.7)'   // Long-term Maintenance - Cyan
                                    ] : [
                                      'rgba(63, 81, 181, 0.7)',   // Implant - Blue
                                      'rgba(245, 0, 87, 0.7)',    // Surgery - Pink
                                      'rgba(76, 175, 80, 0.7)',   // Hospital Stay - Green
                                      'rgba(255, 152, 0, 0.7)',   // Physical Therapy - Orange
                                      'rgba(156, 39, 176, 0.7)',  // Follow-up Visits - Purple
                                      'rgba(0, 188, 212, 0.7)'    // Long-term Maintenance - Cyan
                                    ]
                                  }
                                ]
                              }}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={5}>
                          <Typography variant="subtitle2" gutterBottom>
                            Detailed Breakdown
                          </Typography>

                          <Box sx={{ mb: 2 }}>
                            <Grid container>
                              <Grid item xs={8}>
                                <Typography variant="body2">Implant:</Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography variant="body2" align="right">
                                  ${results.costBreakdown.implant.toLocaleString()}
                                </Typography>
                              </Grid>

                              <Grid item xs={8}>
                                <Typography variant="body2">Surgery:</Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography variant="body2" align="right">
                                  ${results.costBreakdown.surgery.toLocaleString()}
                                </Typography>
                              </Grid>

                              <Grid item xs={8}>
                                <Typography variant="body2">Hospital Stay ({hospitalStayDays} days):</Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography variant="body2" align="right">
                                  ${results.costBreakdown.hospitalStay.toLocaleString()}
                                </Typography>
                              </Grid>

                              <Grid item xs={8}>
                                <Typography variant="body2">Physical Therapy ({physicalTherapySessions} sessions):</Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography variant="body2" align="right">
                                  ${results.costBreakdown.therapy.toLocaleString()}
                                </Typography>
                              </Grid>

                              <Grid item xs={8}>
                                <Typography variant="body2">Follow-up Visits:</Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography variant="body2" align="right">
                                  ${results.costBreakdown.followUp.toLocaleString()}
                                </Typography>
                              </Grid>

                              <Grid item xs={8}>
                                <Typography variant="body2">Long-term Maintenance:</Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography variant="body2" align="right">
                                  ${results.costBreakdown.longTerm.toLocaleString()}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>

                          <Divider sx={{ my: 2 }} />

                          <Grid container>
                            <Grid item xs={8}>
                              <Typography variant="subtitle2">Total 20-Year Cost:</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="subtitle2" align="right">
                                ${results.totalCost.toLocaleString()}
                              </Typography>
                            </Grid>

                            <Grid item xs={8}>
                              <Typography variant="body2" color="text.secondary">Insurance Coverage ({insuranceCoverage}%):</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="body2" align="right" color="text.secondary">
                                ${(results.totalCost * insuranceCoverage / 100).toLocaleString()}
                              </Typography>
                            </Grid>

                            <Grid item xs={8}>
                              <Typography variant="subtitle2" color="primary">Your Out-of-Pocket:</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="subtitle2" align="right" color="primary">
                                ${results.outOfPocketTotal.toLocaleString()}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              border: '1px dashed #ccc',
              borderRadius: 1,
              p: 3
            }}>
              <CalculateIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" align="center" gutterBottom>
                Cost Analysis Results Will Appear Here
              </Typography>
              <Typography variant="body1" align="center">
                Select your options and click "Calculate Costs" to see a detailed breakdown of initial and long-term expenses.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        Note: This calculator provides estimates based on average costs and simplified models. Actual costs may vary based on geographic location, specific hospital charges, insurance plans, and individual patient factors. All figures are in USD.
      </Typography>
    </Paper>
  );
};

export default CostAnalysisCalculator;
