import stressAnalysisData from '../data/stress_analysis/stress_analysis_data.json';

class StressAnalysisService {
  constructor() {
    this.data = stressAnalysisData;
    this.materials = {
      titanium: {
        name: 'Titanium Alloy',
        color: '#B4C7DC',
        youngsModulus: 110, // GPa
        yieldStrength: 880, // MPa
        density: 4.5, // g/cm³
        maxDeformation: 0.05 // For visualization purposes
      },
      cobaltChrome: {
        name: 'Cobalt-Chromium',
        color: '#C0C0C0',
        youngsModulus: 210, // GPa
        yieldStrength: 600, // MPa
        density: 8.3, // g/cm³
        maxDeformation: 0.03 // For visualization purposes
      },
      ceramic: {
        name: 'Ceramic',
        color: '#F5F5F5',
        youngsModulus: 380, // GPa
        yieldStrength: 350, // MPa
        density: 3.9, // g/cm³
        maxDeformation: 0.01 // For visualization purposes
      },
      stainless: {
        name: 'Stainless Steel',
        color: '#A9A9A9',
        youngsModulus: 200, // GPa
        yieldStrength: 500, // MPa
        density: 8.0, // g/cm³
        maxDeformation: 0.04 // For visualization purposes
      },
      oxinium: {
        name: 'Oxidized Zirconium',
        color: '#E8E8E8',
        youngsModulus: 200, // GPa
        yieldStrength: 900, // MPa
        density: 6.5, // g/cm³
        maxDeformation: 0.02 // For visualization purposes
      }
    };
    this.forceScenarios = {
      standing: {
        name: 'Standing',
        force: 1.0, // Body weight multiplier
        description: 'Normal standing position'
      },
      walking: {
        name: 'Walking',
        force: 2.5, // Body weight multiplier
        description: 'Normal gait cycle'
      },
      stairs: {
        name: 'Climbing Stairs',
        force: 3.5, // Body weight multiplier
        description: 'Ascending stairs'
      },
      running: {
        name: 'Running',
        force: 5.0, // Body weight multiplier
        description: 'Jogging/running activity'
      },
      jumping: {
        name: 'Jumping',
        force: 8.0, // Body weight multiplier
        description: 'Landing from a jump'
      }
    };
  }

  // Get stress analysis data for a specific material and activity
  getStressData(materialId, activityId) {
    try {
      return this.data.materials[materialId][activityId];
    } catch (error) {
      console.error(`Error getting stress data for ${materialId} and ${activityId}:`, error);
      return null;
    }
  }

  // Get material comparison data for a specific activity
  getMaterialComparison(activityId) {
    try {
      return this.data.comparisons.materials[activityId];
    } catch (error) {
      console.error(`Error getting material comparison for ${activityId}:`, error);
      return null;
    }
  }

  // Get activity comparison data for a specific material
  getActivityComparison(materialId) {
    try {
      return this.data.comparisons.activities[materialId];
    } catch (error) {
      console.error(`Error getting activity comparison for ${materialId}:`, error);
      return null;
    }
  }

  // Calculate stress for a given material, activity, and patient weight
  calculateStress(materialId, activityId, patientWeight) {
    const material = this.materials[materialId];
    const forceMultiplier = this.forceScenarios[activityId].force;
    
    // Calculate actual force in Newtons
    const actualForce = patientWeight * 9.81 * forceMultiplier; // F = m * g * multiplier
    
    // Calculate maximum stress (simplified)
    const maxStress = actualForce / (material.yieldStrength * 10);
    
    // Get the base stress data
    const baseStressData = this.getStressData(materialId, activityId);
    
    // Scale the stress based on the patient weight
    const scaleFactor = patientWeight / 70; // Base data is for 70kg
    
    return {
      ...baseStressData,
      actual_force: actualForce,
      max_stress: maxStress,
      scale_factor: scaleFactor
    };
  }

  // Get all available materials
  getMaterials() {
    return this.materials;
  }

  // Get all available force scenarios
  getForceScenarios() {
    return this.forceScenarios;
  }

  // Calculate safety factor for a given material, activity, and patient weight
  calculateSafetyFactor(materialId, activityId, patientWeight) {
    const material = this.materials[materialId];
    const forceMultiplier = this.forceScenarios[activityId].force;
    
    // Calculate actual force in Newtons
    const actualForce = patientWeight * 9.81 * forceMultiplier; // F = m * g * multiplier
    
    // Calculate maximum stress (simplified)
    const maxStress = actualForce / (material.yieldStrength * 10);
    
    // Calculate safety factor
    const safetyFactor = material.yieldStrength / (maxStress * 1000);
    
    return safetyFactor;
  }

  // Get stress distribution data for visualization
  getStressDistributionData(materialId, activityId, patientWeight) {
    // This would normally extract the actual stress distribution data
    // from the Python-generated data, but for simplicity, we'll return
    // the image data
    const stressData = this.calculateStress(materialId, activityId, patientWeight);
    
    return {
      image2D: stressData.image_2d_base64,
      image3D: stressData.image_3d_base64,
      maxStress: stressData.max_stress,
      actualForce: stressData.actual_force
    };
  }

  // Compare materials for a given activity and patient weight
  compareMaterials(materialIds, activityId, patientWeight) {
    const results = {};
    
    for (const materialId of materialIds) {
      results[materialId] = this.calculateStress(materialId, activityId, patientWeight);
    }
    
    return results;
  }

  // Compare activities for a given material and patient weight
  compareActivities(materialId, activityIds, patientWeight) {
    const results = {};
    
    for (const activityId of activityIds) {
      results[activityId] = this.calculateStress(materialId, activityId, patientWeight);
    }
    
    return results;
  }
}

// Create a singleton instance
const stressAnalysisService = new StressAnalysisService();

export default stressAnalysisService;
