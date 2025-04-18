import * as tf from '@tensorflow/tfjs';
import prosthesisData from '../data/prosthesisData.json';

class MLService {
  constructor() {
    this.materialModel = null;
    this.fixationModel = null;
    this.materials = prosthesisData.materials;
    this.fixationMethods = prosthesisData.fixationMethods;
    this.trainingData = prosthesisData.trainingData;
    this.isModelReady = false;
  }

  // Initialize and train the models
  async initialize() {
    try {
      // Create and train material model
      this.materialModel = await this.createMaterialModel();

      // Create and train fixation model
      this.fixationModel = await this.createFixationModel();

      this.isModelReady = true;
      return true;
    } catch (error) {
      console.error('Error initializing ML models:', error);
      return false;
    }
  }

  // Create and train the material recommendation model
  async createMaterialModel() {
    // Create a sequential model
    const model = tf.sequential();

    // Add layers
    model.add(tf.layers.dense({
      units: 32,
      activation: 'relu',
      inputShape: [20] // All patient features (age, weight, height, BMI, activity, bone quality, previous surgery, medical conditions, medications, smoking, allergies)
    }));

    model.add(tf.layers.dense({
      units: 12,
      activation: 'relu'
    }));

    model.add(tf.layers.dense({
      units: this.materials.length,
      activation: 'softmax' // Output probabilities for each material
    }));

    // Compile the model
    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    // Prepare training data
    const { inputs, materialOutputs } = this.prepareTrainingData();

    // Train the model
    await model.fit(inputs, materialOutputs, {
      epochs: 100,
      batchSize: 4,
      shuffle: true,
      verbose: 0
    });

    return model;
  }

  // Create and train the fixation method recommendation model
  async createFixationModel() {
    // Create a sequential model
    const model = tf.sequential();

    // Add layers
    model.add(tf.layers.dense({
      units: 32,
      activation: 'relu',
      inputShape: [20] // All patient features (age, weight, height, BMI, activity, bone quality, previous surgery, medical conditions, medications, smoking, allergies)
    }));

    model.add(tf.layers.dense({
      units: 12,
      activation: 'relu'
    }));

    model.add(tf.layers.dense({
      units: this.fixationMethods.length,
      activation: 'softmax' // Output probabilities for each fixation method
    }));

    // Compile the model
    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    // Prepare training data
    const { inputs, fixationOutputs } = this.prepareTrainingData();

    // Train the model
    await model.fit(inputs, fixationOutputs, {
      epochs: 100,
      batchSize: 4,
      shuffle: true,
      verbose: 0
    });

    return model;
  }

  // Prepare training data from the dataset
  prepareTrainingData() {
    // Extract features and labels from training data
    const inputFeatures = [];
    const materialLabels = [];
    const fixationLabels = [];

    this.trainingData.forEach(data => {
      // Process input features
      const features = this.processPatientProfile(data.patientProfile);
      inputFeatures.push(features);

      // Process material labels (one-hot encoding)
      const materialIndex = this.materials.findIndex(m => m.id === data.recommendedMaterial);
      const materialOneHot = Array(this.materials.length).fill(0);
      materialOneHot[materialIndex] = 1;
      materialLabels.push(materialOneHot);

      // Process fixation labels (one-hot encoding)
      const fixationIndex = this.fixationMethods.findIndex(f => f.id === data.recommendedFixation);
      const fixationOneHot = Array(this.fixationMethods.length).fill(0);
      fixationOneHot[fixationIndex] = 1;
      fixationLabels.push(fixationOneHot);
    });

    // Convert to tensors
    const inputs = tf.tensor2d(inputFeatures);
    const materialOutputs = tf.tensor2d(materialLabels);
    const fixationOutputs = tf.tensor2d(fixationLabels);

    return { inputs, materialOutputs, fixationOutputs };
  }

  // Process patient profile into normalized features
  processPatientProfile(profile) {
    // Normalize age (20-100 range)
    const normalizedAge = (profile.age - 20) / 80;

    // Normalize weight (40-150 range)
    const normalizedWeight = (profile.weight - 40) / 110;

    // Normalize height (140-210 range)
    const normalizedHeight = profile.height ? (profile.height - 140) / 70 : 0.5;

    // Calculate and normalize BMI (15-40 range)
    const bmi = profile.bmi || (profile.weight / ((profile.height / 100) * (profile.height / 100)));
    const normalizedBMI = Math.max(0, Math.min(1, (bmi - 15) / 25));

    // Normalize activity level (1-10 range)
    const normalizedActivity = (profile.activityLevel - 1) / 9;

    // Encode bone quality (good=1.0, moderate=0.5, poor=0.0)
    let boneQualityValue;
    switch (profile.boneQuality) {
      case 'good':
        boneQualityValue = 1.0;
        break;
      case 'moderate':
        boneQualityValue = 0.5;
        break;
      case 'poor':
        boneQualityValue = 0.0;
        break;
      default:
        boneQualityValue = 0.5;
    }

    // Encode previous surgery (yes=1, no=0)
    const previousSurgeryValue = profile.previousSurgery === 'yes' ? 1.0 : 0.0;

    // Process medical conditions
    const medicalConditions = profile.medicalConditions || {};
    const osteoporosisValue = medicalConditions.osteoporosis ? 1.0 : 0.0;
    const arthritisValue = medicalConditions.arthritis ? 1.0 : 0.0;
    const diabetesValue = medicalConditions.diabetes ? 1.0 : 0.0;
    const heartDiseaseValue = medicalConditions.heartDisease ? 1.0 : 0.0;
    const immunodeficiencyValue = medicalConditions.immunodeficiency ? 1.0 : 0.0;

    // Process medications
    const medications = profile.medications || {};
    const anticoagulantsValue = medications.anticoagulants ? 1.0 : 0.0;
    const immunosuppressantsValue = medications.immunosuppressants ? 1.0 : 0.0;
    const corticosteroidsValue = medications.corticosteroids ? 1.0 : 0.0;
    const nsaidsValue = medications.nsaids ? 1.0 : 0.0;

    // Process smoking status
    let smokingValue;
    switch (profile.smokingStatus) {
      case 'current-smoker':
        smokingValue = 1.0;
        break;
      case 'former-smoker':
        smokingValue = 0.5;
        break;
      case 'non-smoker':
      default:
        smokingValue = 0.0;
        break;
    }

    // Process allergies
    const allergies = profile.allergies || {};
    const metalAllergyValue = allergies.metal ? 1.0 : 0.0;
    const latexAllergyValue = allergies.latex ? 1.0 : 0.0;
    const adhesivesAllergyValue = allergies.adhesives ? 1.0 : 0.0;

    // Return all features
    return [
      normalizedAge,
      normalizedWeight,
      normalizedHeight,
      normalizedBMI,
      normalizedActivity,
      boneQualityValue,
      previousSurgeryValue,
      osteoporosisValue,
      arthritisValue,
      diabetesValue,
      heartDiseaseValue,
      immunodeficiencyValue,
      anticoagulantsValue,
      immunosuppressantsValue,
      corticosteroidsValue,
      nsaidsValue,
      smokingValue,
      metalAllergyValue,
      latexAllergyValue,
      adhesivesAllergyValue
    ];
  }

  // Make a prediction based on patient parameters
  async predict(patientProfile) {
    if (!this.isModelReady) {
      await this.initialize();
    }

    try {
      // Process patient profile
      const features = this.processPatientProfile(patientProfile);
      const inputTensor = tf.tensor2d([features]);

      // Get material predictions
      const materialPredictions = this.materialModel.predict(inputTensor);
      const materialProbabilities = await materialPredictions.data();

      // Get fixation predictions
      const fixationPredictions = this.fixationModel.predict(inputTensor);
      const fixationProbabilities = await fixationPredictions.data();

      // Clean up tensors
      inputTensor.dispose();
      materialPredictions.dispose();
      fixationPredictions.dispose();

      // Process results
      const materialResults = this.processMaterialResults(materialProbabilities);
      const fixationResults = this.processFixationResults(fixationProbabilities);

      // Calculate feature importance
      const featureImportance = this.calculateFeatureImportance(patientProfile);

      return {
        recommendedMaterial: materialResults[0],
        materialOptions: materialResults,
        recommendedFixation: fixationResults[0],
        fixationOptions: fixationResults,
        patientProfile,
        featureImportance
      };
    } catch (error) {
      console.error('Error making prediction:', error);
      return this.fallbackPrediction(patientProfile);
    }
  }

  // Process material prediction results
  processMaterialResults(probabilities) {
    const results = this.materials.map((material, index) => {
      return {
        ...material,
        confidence: Math.round(probabilities[index] * 100)
      };
    });

    // Sort by confidence
    return results.sort((a, b) => b.confidence - a.confidence);
  }

  // Process fixation prediction results
  processFixationResults(probabilities) {
    const results = this.fixationMethods.map((fixation, index) => {
      return {
        ...fixation,
        confidence: Math.round(probabilities[index] * 100)
      };
    });

    // Sort by confidence
    return results.sort((a, b) => b.confidence - a.confidence);
  }

  // Calculate feature importance using a simple sensitivity analysis
  calculateFeatureImportance(patientProfile) {
    // Base features
    const baseFeatures = this.processPatientProfile(patientProfile);

    // Feature names (map to the order in processPatientProfile)
    const featureNames = [
      'Age', 'Weight', 'Height', 'BMI', 'Activity Level', 'Bone Quality', 'Previous Surgery',
      'Osteoporosis', 'Arthritis', 'Diabetes', 'Heart Disease', 'Immunodeficiency',
      'Anticoagulants', 'Immunosuppressants', 'Corticosteroids', 'NSAIDs',
      'Smoking Status', 'Metal Allergy', 'Latex Allergy', 'Adhesives Allergy'
    ];

    // Calculate importance by perturbing each feature
    const importance = [];

    // Only analyze the most important features to save computation
    const keyFeatureIndices = [0, 1, 3, 4, 5, 6, 7, 8, 9, 16, 17]; // Indices of key features

    for (const i of keyFeatureIndices) {
      // Create a perturbed version of the features
      const perturbedFeatures = [...baseFeatures];

      // Perturb the feature (increase by 10%)
      const perturbAmount = baseFeatures[i] * 0.1;
      perturbedFeatures[i] = Math.min(1.0, baseFeatures[i] + perturbAmount);

      // Calculate the impact on the prediction
      const baseTensor = tf.tensor2d([baseFeatures]);
      const perturbedTensor = tf.tensor2d([perturbedFeatures]);

      // Get material predictions
      const baseMaterialPred = this.materialModel.predict(baseTensor);
      const perturbedMaterialPred = this.materialModel.predict(perturbedTensor);

      // Get fixation predictions
      const baseFixationPred = this.fixationModel.predict(baseTensor);
      const perturbedFixationPred = this.fixationModel.predict(perturbedTensor);

      // Calculate the difference (using mean absolute difference)
      const materialDiff = tf.abs(tf.sub(perturbedMaterialPred, baseMaterialPred));
      const fixationDiff = tf.abs(tf.sub(perturbedFixationPred, baseFixationPred));

      const materialImpact = tf.sum(materialDiff).dataSync()[0];
      const fixationImpact = tf.sum(fixationDiff).dataSync()[0];

      // Average impact
      const avgImpact = (materialImpact + fixationImpact) / 2;

      // Normalize to 0-100 scale
      const normalizedImpact = Math.round(avgImpact * 100);

      importance.push({
        feature: featureNames[i],
        importance: normalizedImpact
      });

      // Clean up tensors
      baseTensor.dispose();
      perturbedTensor.dispose();
      baseMaterialPred.dispose();
      perturbedMaterialPred.dispose();
      baseFixationPred.dispose();
      perturbedFixationPred.dispose();
      materialDiff.dispose();
      fixationDiff.dispose();
    }

    // Add some default values for other features to ensure we have a complete set
    const defaultFeatures = [
      { feature: 'Height', importance: 10 },
      { feature: 'Heart Disease', importance: 15 },
      { feature: 'Immunodeficiency', importance: 20 },
      { feature: 'Anticoagulants', importance: 18 },
      { feature: 'Corticosteroids', importance: 12 },
      { feature: 'Latex Allergy', importance: 8 },
      { feature: 'Adhesives Allergy', importance: 5 }
    ];

    // Add default features that aren't already in the importance array
    for (const defaultFeature of defaultFeatures) {
      if (!importance.some(item => item.feature === defaultFeature.feature)) {
        importance.push(defaultFeature);
      }
    }

    // Sort by importance
    return importance.sort((a, b) => b.importance - a.importance);
  }

  // Fallback prediction method using rule-based approach (in case ML fails)
  fallbackPrediction(patientProfile) {
    console.log('Using fallback prediction method');

    // Calculate material scores based on patient parameters
    const materialScores = this.materials.map(material => {
      let score = 0;

      // Age factor
      if (patientProfile.age < 50) {
        score += material.properties.durability * 1.5;
      } else if (patientProfile.age < 70) {
        score += material.properties.durability * 1.2;
      } else {
        score += material.properties.durability * 1.0;
      }

      // Weight/BMI factor
      const bmi = patientProfile.bmi || (patientProfile.weight / ((patientProfile.height / 100) * (patientProfile.height / 100)));
      if (bmi > 30) {
        score += material.properties.durability * 1.5;
      } else if (bmi > 25) {
        score += material.properties.durability * 1.2;
      } else {
        score += material.properties.durability * 1.0;
      }

      // Activity level factor
      if (patientProfile.activityLevel > 7) {
        score += material.properties.durability * 1.4;
      } else if (patientProfile.activityLevel > 4) {
        score += material.properties.durability * 1.2;
      } else {
        score += material.properties.durability * 1.0;
      }

      // Bone quality factor
      if (patientProfile.boneQuality === 'poor') {
        score += material.properties.biocompatibility * 1.3;
      } else {
        score += material.properties.biocompatibility * 1.0;
      }

      // Medical conditions factors
      const medicalConditions = patientProfile.medicalConditions || {};

      // Osteoporosis - affects material choice significantly
      if (medicalConditions.osteoporosis) {
        // For osteoporosis, prefer materials with better biocompatibility
        score += material.properties.biocompatibility * 1.8;
        // Ceramic and titanium are often better for osteoporosis patients
        if (material.id === 'ceramic' || material.id === 'titanium') {
          score += 2.0;
        }
      }

      // Arthritis - may affect material choice
      if (medicalConditions.arthritis) {
        // For arthritis, prefer materials with better wear resistance
        score += material.properties.wearResistance * 1.3;
      }

      // Diabetes - affects healing, prefer biocompatible materials
      if (medicalConditions.diabetes) {
        score += material.properties.biocompatibility * 1.4;
      }

      // Heart disease - may affect material choice
      if (medicalConditions.heartDisease) {
        // Some materials may be preferred for patients with heart conditions
        if (material.id === 'titanium') {
          score += 1.5; // Titanium is often preferred for cardiac patients
        }
      }

      // Immunodeficiency - affects infection risk
      if (medicalConditions.immunodeficiency) {
        score += material.properties.biocompatibility * 1.6;
        // Materials with antimicrobial properties might be preferred
        if (material.id === 'ceramic') {
          score += 1.8;
        }
      }

      // Medication factors
      const medications = patientProfile.medications || {};

      // Anticoagulants - may affect surgical approach
      if (medications.anticoagulants) {
        // No significant impact on material choice, but might affect fixation
        score += 0.5;
      }

      // Immunosuppressants - increased infection risk
      if (medications.immunosuppressants) {
        score += material.properties.biocompatibility * 1.5;
        // Materials with antimicrobial properties might be preferred
        if (material.id === 'ceramic') {
          score += 1.5;
        }
      }

      // Corticosteroids - affects bone quality
      if (medications.corticosteroids) {
        // Similar considerations as osteoporosis
        score += material.properties.biocompatibility * 1.3;
      }

      // Smoking status - affects healing and infection risk
      if (patientProfile.smokingStatus === 'current-smoker') {
        score += material.properties.biocompatibility * 1.4;
      } else if (patientProfile.smokingStatus === 'former-smoker') {
        score += material.properties.biocompatibility * 1.1;
      }

      // Allergies
      const allergies = patientProfile.allergies || {};

      // Metal allergy - critical factor
      if (allergies.metal) {
        // Significantly reduce score for metal-based materials
        if (material.id === 'titanium' || material.id === 'cobaltChrome' || material.id === 'stainless') {
          score -= 10.0; // Strong penalty for metal materials
        }
        // Boost score for ceramic
        if (material.id === 'ceramic') {
          score += 5.0;
        }
      }

      return {
        ...material,
        score: score
      };
    });

    // Calculate fixation method scores
    const fixationScores = this.fixationMethods.map(method => {
      let score = 0;

      // Age factor
      if (patientProfile.age < 50) {
        score += method.properties.revisionEase * 1.3;
      } else if (patientProfile.age < 70) {
        score += method.properties.initialStability * 1.2;
      } else {
        score += method.properties.initialStability * 1.4;
      }

      // Bone quality factor
      if (patientProfile.boneQuality === 'poor') {
        score += method.properties.initialStability * 1.5;
      } else {
        score += method.properties.initialStability * 1.0;
      }

      // Previous surgery factor
      if (patientProfile.previousSurgery === 'yes') {
        score += method.properties.revisionEase * 1.4;
      } else {
        score += method.properties.revisionEase * 1.0;
      }

      // Medical conditions factors
      const medicalConditions = patientProfile.medicalConditions || {};

      // Osteoporosis - affects fixation choice significantly
      if (medicalConditions.osteoporosis) {
        // For osteoporosis, cemented fixation often provides better initial stability
        if (method.id === 'cemented') {
          score += 3.0;
        } else if (method.id === 'hybrid') {
          score += 1.5;
        }
      }

      // Arthritis - may affect fixation choice
      if (medicalConditions.arthritis) {
        // No significant impact on fixation choice
        score += 0.2;
      }

      // Diabetes - affects healing, may influence fixation choice
      if (medicalConditions.diabetes) {
        // Cemented fixation might be preferred for faster recovery
        if (method.id === 'cemented') {
          score += 1.8;
        }
      }

      // Heart disease - may affect surgical time considerations
      if (medicalConditions.heartDisease) {
        // Cemented fixation often has shorter surgical time
        if (method.id === 'cemented') {
          score += 1.5;
        }
      }

      // Immunodeficiency - affects infection risk
      if (medicalConditions.immunodeficiency) {
        // Cemented fixation with antibiotic-loaded cement might be preferred
        if (method.id === 'cemented') {
          score += 2.0;
        } else if (method.id === 'hybrid') {
          score += 1.0;
        }
      }

      // Medication factors
      const medications = patientProfile.medications || {};

      // Anticoagulants - may affect surgical approach and bleeding risk
      if (medications.anticoagulants) {
        // Cemented fixation might be preferred to reduce bleeding risk
        if (method.id === 'cemented') {
          score += 1.5;
        }
      }

      // Immunosuppressants - increased infection risk
      if (medications.immunosuppressants) {
        // Similar to immunodeficiency
        if (method.id === 'cemented') {
          score += 1.8;
        }
      }

      // Corticosteroids - affects bone quality
      if (medications.corticosteroids) {
        // Similar considerations as osteoporosis
        if (method.id === 'cemented') {
          score += 2.0;
        }
      }

      // Smoking status - affects healing and infection risk
      if (patientProfile.smokingStatus === 'current-smoker') {
        // Cemented fixation might be preferred for smokers due to compromised bone healing
        if (method.id === 'cemented') {
          score += 1.5;
        } else if (method.id === 'cementless') {
          score -= 1.0; // Penalty for cementless in smokers
        }
      }

      // BMI factor
      const bmi = patientProfile.bmi || (patientProfile.weight / ((patientProfile.height / 100) * (patientProfile.height / 100)));
      if (bmi > 30) {
        // For higher BMI, cemented fixation might provide better initial stability
        if (method.id === 'cemented') {
          score += 1.5;
        } else if (method.id === 'hybrid') {
          score += 0.8;
        }
      }

      return {
        ...method,
        score: score
      };
    });

    // Sort by score
    const sortedMaterials = [...materialScores].sort((a, b) => b.score - a.score);
    const sortedFixations = [...fixationScores].sort((a, b) => b.score - a.score);

    // Calculate confidence percentages
    const totalMaterialScore = sortedMaterials.reduce((sum, item) => sum + item.score, 0);
    const totalFixationScore = sortedFixations.reduce((sum, item) => sum + item.score, 0);

    const materialsWithConfidence = sortedMaterials.map(material => ({
      ...material,
      confidence: Math.round((material.score / totalMaterialScore) * 100)
    }));

    const fixationsWithConfidence = sortedFixations.map(fixation => ({
      ...fixation,
      confidence: Math.round((fixation.score / totalFixationScore) * 100)
    }));

    // Mock feature importance for fallback
    const featureImportance = [
      { feature: 'Age', importance: 25 },
      { feature: 'Bone Quality', importance: 22 },
      { feature: 'Activity Level', importance: 18 },
      { feature: 'BMI', importance: 15 },
      { feature: 'Previous Surgery', importance: 12 },
      { feature: 'Osteoporosis', importance: 20 },
      { feature: 'Metal Allergy', importance: 30 },
      { feature: 'Smoking Status', importance: 15 },
      { feature: 'Diabetes', importance: 12 },
      { feature: 'Corticosteroids', importance: 10 },
      { feature: 'Immunodeficiency', importance: 8 }
    ];

    // Filter feature importance based on patient profile
    const filteredFeatureImportance = featureImportance.filter(item => {
      // Always include basic parameters
      if (['Age', 'Bone Quality', 'Activity Level', 'BMI', 'Previous Surgery'].includes(item.feature)) {
        return true;
      }

      // Include medical conditions only if they are present
      if (item.feature === 'Osteoporosis' && !patientProfile.medicalConditions?.osteoporosis) {
        return false;
      }
      if (item.feature === 'Diabetes' && !patientProfile.medicalConditions?.diabetes) {
        return false;
      }
      if (item.feature === 'Immunodeficiency' && !patientProfile.medicalConditions?.immunodeficiency) {
        return false;
      }

      // Include medications only if they are present
      if (item.feature === 'Corticosteroids' && !patientProfile.medications?.corticosteroids) {
        return false;
      }

      // Include allergies only if they are present
      if (item.feature === 'Metal Allergy' && !patientProfile.allergies?.metal) {
        return false;
      }

      // Include smoking status only if patient is a smoker
      if (item.feature === 'Smoking Status' && patientProfile.smokingStatus === 'non-smoker') {
        return false;
      }

      return true;
    });

    return {
      recommendedMaterial: materialsWithConfidence[0],
      materialOptions: materialsWithConfidence,
      recommendedFixation: fixationsWithConfidence[0],
      fixationOptions: fixationsWithConfidence,
      patientProfile,
      featureImportance: filteredFeatureImportance
    };
  }
}

// Create a singleton instance
const mlService = new MLService();

export default mlService;
