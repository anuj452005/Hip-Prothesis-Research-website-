import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
import json
import os
from mpl_toolkits.mplot3d import Axes3D
from matplotlib import cm
import base64
from io import BytesIO

# Material properties (same as in the React component)
material_properties = {
    "titanium": {
        "name": "Titanium Alloy",
        "color": "#B4C7DC",
        "youngsModulus": 110,  # GPa
        "yieldStrength": 880,  # MPa
        "density": 4.5,  # g/cm³
        "maxDeformation": 0.05  # For visualization purposes
    },
    "cobaltChrome": {
        "name": "Cobalt-Chromium",
        "color": "#C0C0C0",
        "youngsModulus": 210,  # GPa
        "yieldStrength": 600,  # MPa
        "density": 8.3,  # g/cm³
        "maxDeformation": 0.03  # For visualization purposes
    },
    "ceramic": {
        "name": "Ceramic",
        "color": "#F5F5F5",
        "youngsModulus": 380,  # GPa
        "yieldStrength": 350,  # MPa
        "density": 3.9,  # g/cm³
        "maxDeformation": 0.01  # For visualization purposes
    },
    "stainless": {
        "name": "Stainless Steel",
        "color": "#A9A9A9",
        "youngsModulus": 200,  # GPa
        "yieldStrength": 500,  # MPa
        "density": 8.0,  # g/cm³
        "maxDeformation": 0.04  # For visualization purposes
    },
    "oxinium": {
        "name": "Oxidized Zirconium",
        "color": "#E8E8E8",
        "youngsModulus": 200,  # GPa
        "yieldStrength": 900,  # MPa
        "density": 6.5,  # g/cm³
        "maxDeformation": 0.02  # For visualization purposes
    }
}

# Force scenarios for different activities
force_scenarios = {
    "standing": {
        "name": "Standing",
        "force": 1.0,  # Body weight multiplier
        "description": "Normal standing position"
    },
    "walking": {
        "name": "Walking",
        "force": 2.5,  # Body weight multiplier
        "description": "Normal gait cycle"
    },
    "stairs": {
        "name": "Climbing Stairs",
        "force": 3.5,  # Body weight multiplier
        "description": "Ascending stairs"
    },
    "running": {
        "name": "Running",
        "force": 5.0,  # Body weight multiplier
        "description": "Jogging/running activity"
    },
    "jumping": {
        "name": "Jumping",
        "force": 8.0,  # Body weight multiplier
        "description": "Landing from a jump"
    }
}

# Create output directory if it doesn't exist
output_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data', 'stress_analysis')
os.makedirs(output_dir, exist_ok=True)
print(f"Output directory: {output_dir}")

def calculate_stress_distribution(material_id, activity_id, patient_weight=70):
    """
    Calculate stress distribution for a given material, activity, and patient weight
    """
    material = material_properties[material_id]
    force_multiplier = force_scenarios[activity_id]["force"]

    # Calculate actual force in Newtons
    actual_force = patient_weight * 9.81 * force_multiplier  # F = m * g * multiplier

    # Create a simplified model of the hip prosthesis
    # We'll use a 3D grid to represent the prosthesis
    x = np.linspace(-1, 1, 20)
    y = np.linspace(-5, 2, 70)  # Stem to head
    z = np.linspace(-1, 1, 20)

    X, Y, Z = np.meshgrid(x, y, z, indexing='ij')

    # Calculate distance from the central axis
    R = np.sqrt(X**2 + Z**2)

    # Create a mask for the prosthesis shape
    # Stem: cylindrical shape that tapers
    stem_radius = 0.5 - 0.2 * (Y + 5) / 5  # Tapers from 0.5 to 0.3
    stem_mask = (Y < 0) & (R < stem_radius)

    # Neck: cylindrical shape at an angle
    neck_x_offset = 0.3 * (Y - 0) / 1.5  # Offset in x direction based on height
    neck_radius = 0.3
    neck_center_x = neck_x_offset
    neck_center_z = 0
    neck_distance = np.sqrt((X - neck_center_x)**2 + (Z - neck_center_z)**2)
    neck_mask = (Y >= 0) & (Y < 1.5) & (neck_distance < neck_radius)

    # Head: spherical shape
    head_center_x = 0.75
    head_center_y = 1.5
    head_center_z = 0
    head_distance = np.sqrt((X - head_center_x)**2 + (Y - head_center_y)**2 + (Z - head_center_z)**2)
    head_radius = 1.0
    head_mask = head_distance < head_radius

    # Combine all parts
    prosthesis_mask = stem_mask | neck_mask | head_mask

    # Calculate stress based on position and material properties
    # This is a simplified model - in reality, FEA would be used

    # Base stress calculation: higher at the bottom of the stem, decreases towards the head
    normalized_height = (Y + 5) / 7  # 0 at bottom of stem, 1 at top of head
    base_stress = (1 - normalized_height) * actual_force / 1000  # Simplified stress calculation

    # Adjust stress based on material properties
    # Higher Young's modulus means lower stress for the same force
    material_factor = 200 / material["youngsModulus"]  # Normalize to a reference value

    # Calculate stress
    stress = base_stress * material_factor

    # Normalize stress to 0-1 range for visualization
    max_stress = actual_force / (material["yieldStrength"] * 10)  # Simplified maximum stress
    normalized_stress = np.clip(stress / max_stress, 0, 1)

    # Apply the prosthesis mask
    masked_stress = np.where(prosthesis_mask, normalized_stress, np.nan)

    return {
        "X": X,
        "Y": Y,
        "Z": Z,
        "stress": masked_stress,
        "max_stress": max_stress,
        "actual_force": actual_force,
        "material": material,
        "force_scenario": force_scenarios[activity_id],
        "patient_weight": patient_weight
    }

def generate_2d_stress_plot(stress_data, output_path):
    """
    Generate a 2D cross-section plot of the stress distribution
    """
    # Extract data
    X = stress_data["X"]
    Y = stress_data["Y"]
    Z = stress_data["Z"]
    stress = stress_data["stress"]
    material = stress_data["material"]
    force_scenario = stress_data["force_scenario"]
    actual_force = stress_data["actual_force"]

    # Create a cross-section at Z=0
    mid_z = Z.shape[2] // 2
    stress_slice = stress[:, :, mid_z]
    X_slice = X[:, :, mid_z]
    Y_slice = Y[:, :, mid_z]

    # Create a custom colormap (green to yellow to red)
    colors = [(0, 0.8, 0), (1, 1, 0), (1, 0, 0)]
    cmap = LinearSegmentedColormap.from_list("stress_cmap", colors, N=256)

    # Create the plot
    plt.figure(figsize=(10, 12))
    plt.pcolormesh(X_slice, Y_slice, stress_slice, cmap=cmap, shading='auto')
    plt.colorbar(label='Normalized Stress')
    plt.axis('equal')
    plt.title(f'Stress Distribution - {material["name"]}\n'
              f'Activity: {force_scenario["name"]} ({force_scenario["force"]}x body weight)\n'
              f'Force: {actual_force:.1f} N')
    plt.xlabel('X (cm)')
    plt.ylabel('Y (cm)')

    # Add annotations
    plt.annotate('Stem', xy=(0, -2.5), xytext=(1.5, -2.5),
                 arrowprops=dict(facecolor='black', shrink=0.05))
    plt.annotate('Neck', xy=(0.3, 0.75), xytext=(1.5, 0.75),
                 arrowprops=dict(facecolor='black', shrink=0.05))
    plt.annotate('Head', xy=(0.75, 1.5), xytext=(2, 1.5),
                 arrowprops=dict(facecolor='black', shrink=0.05))

    # Save the plot
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    plt.close()

    # Also save as base64 for embedding in JSON
    buffer = BytesIO()
    plt.figure(figsize=(10, 12))
    plt.pcolormesh(X_slice, Y_slice, stress_slice, cmap=cmap, shading='auto')
    plt.colorbar(label='Normalized Stress')
    plt.axis('equal')
    plt.title(f'Stress Distribution - {material["name"]}\n'
              f'Activity: {force_scenario["name"]} ({force_scenario["force"]}x body weight)\n'
              f'Force: {actual_force:.1f} N')
    plt.xlabel('X (cm)')
    plt.ylabel('Y (cm)')
    plt.savefig(buffer, format='png', dpi=100, bbox_inches='tight')
    plt.close()

    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.read()).decode('utf-8')

    return image_base64

def generate_3d_stress_plot(stress_data, output_path):
    """
    Generate a 3D plot of the stress distribution
    """
    # Extract data
    X = stress_data["X"]
    Y = stress_data["Y"]
    Z = stress_data["Z"]
    stress = stress_data["stress"]
    material = stress_data["material"]
    force_scenario = stress_data["force_scenario"]
    actual_force = stress_data["actual_force"]

    # Create a custom colormap (green to yellow to red)
    colors = [(0, 0.8, 0), (1, 1, 0), (1, 0, 0)]
    cmap = LinearSegmentedColormap.from_list("stress_cmap", colors, N=256)

    # Create the 3D plot
    fig = plt.figure(figsize=(12, 10))
    ax = fig.add_subplot(111, projection='3d')

    # We'll plot points with stress values as colors
    # To make it more efficient, we'll sample the data
    sample_rate = 2
    X_sample = X[::sample_rate, ::sample_rate, ::sample_rate]
    Y_sample = Y[::sample_rate, ::sample_rate, ::sample_rate]
    Z_sample = Z[::sample_rate, ::sample_rate, ::sample_rate]
    stress_sample = stress[::sample_rate, ::sample_rate, ::sample_rate]

    # Flatten the arrays
    X_flat = X_sample.flatten()
    Y_flat = Y_sample.flatten()
    Z_flat = Z_sample.flatten()
    stress_flat = stress_sample.flatten()

    # Remove NaN values
    mask = ~np.isnan(stress_flat)
    X_plot = X_flat[mask]
    Y_plot = Y_flat[mask]
    Z_plot = Z_flat[mask]
    stress_plot = stress_flat[mask]

    # Plot the points
    scatter = ax.scatter(X_plot, Y_plot, Z_plot, c=stress_plot, cmap=cmap, s=10, alpha=0.8)

    # Add a color bar
    fig.colorbar(scatter, label='Normalized Stress')

    # Set labels and title
    ax.set_xlabel('X (cm)')
    ax.set_ylabel('Y (cm)')
    ax.set_zlabel('Z (cm)')
    ax.set_title(f'3D Stress Distribution - {material["name"]}\n'
                 f'Activity: {force_scenario["name"]} ({force_scenario["force"]}x body weight)\n'
                 f'Force: {actual_force:.1f} N')

    # Set equal aspect ratio
    ax.set_box_aspect([1, 7, 1])

    # Save the plot
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    plt.close()

    # Also save as base64 for embedding in JSON
    buffer = BytesIO()
    fig = plt.figure(figsize=(12, 10))
    ax = fig.add_subplot(111, projection='3d')
    scatter = ax.scatter(X_plot, Y_plot, Z_plot, c=stress_plot, cmap=cmap, s=10, alpha=0.8)
    fig.colorbar(scatter, label='Normalized Stress')
    ax.set_xlabel('X (cm)')
    ax.set_ylabel('Y (cm)')
    ax.set_zlabel('Z (cm)')
    ax.set_title(f'3D Stress Distribution - {material["name"]}\n'
                 f'Activity: {force_scenario["name"]} ({force_scenario["force"]}x body weight)\n'
                 f'Force: {actual_force:.1f} N')
    ax.set_box_aspect([1, 7, 1])
    plt.savefig(buffer, format='png', dpi=100, bbox_inches='tight')
    plt.close()

    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.read()).decode('utf-8')

    return image_base64

def generate_stress_comparison_plot(materials, activity_id, patient_weight, output_path):
    """
    Generate a comparison plot of stress distributions for different materials
    """
    plt.figure(figsize=(15, 10))

    # Create a custom colormap (green to yellow to red)
    colors = [(0, 0.8, 0), (1, 1, 0), (1, 0, 0)]
    cmap = LinearSegmentedColormap.from_list("stress_cmap", colors, N=256)

    # Calculate stress for each material
    stress_data_list = []
    for i, material_id in enumerate(materials):
        stress_data = calculate_stress_distribution(material_id, activity_id, patient_weight)
        stress_data_list.append(stress_data)

    # Create subplots
    for i, (material_id, stress_data) in enumerate(zip(materials, stress_data_list)):
        plt.subplot(1, len(materials), i+1)

        # Extract data for the cross-section
        X = stress_data["X"]
        Y = stress_data["Y"]
        Z = stress_data["Z"]
        stress = stress_data["stress"]
        material = stress_data["material"]

        # Create a cross-section at Z=0
        mid_z = Z.shape[2] // 2
        stress_slice = stress[:, :, mid_z]
        X_slice = X[:, :, mid_z]
        Y_slice = Y[:, :, mid_z]

        # Plot the stress distribution
        plt.pcolormesh(X_slice, Y_slice, stress_slice, cmap=cmap, shading='auto', vmin=0, vmax=1)
        plt.colorbar(label='Normalized Stress')
        plt.axis('equal')
        plt.title(f'{material["name"]}\nYoung\'s Modulus: {material["youngsModulus"]} GPa\nYield Strength: {material["yieldStrength"]} MPa')
        plt.xlabel('X (cm)')
        plt.ylabel('Y (cm)')

    # Add a common title
    force_scenario = force_scenarios[activity_id]
    actual_force = patient_weight * 9.81 * force_scenario["force"]
    plt.suptitle(f'Stress Distribution Comparison\nActivity: {force_scenario["name"]} ({force_scenario["force"]}x body weight)\nForce: {actual_force:.1f} N', fontsize=16)

    # Adjust layout
    plt.tight_layout(rect=[0, 0, 1, 0.95])

    # Save the plot
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    plt.close()

    # Also save as base64 for embedding in JSON
    buffer = BytesIO()
    plt.figure(figsize=(15, 10))

    # Create subplots
    for i, (material_id, stress_data) in enumerate(zip(materials, stress_data_list)):
        plt.subplot(1, len(materials), i+1)

        # Extract data for the cross-section
        X = stress_data["X"]
        Y = stress_data["Y"]
        Z = stress_data["Z"]
        stress = stress_data["stress"]
        material = stress_data["material"]

        # Create a cross-section at Z=0
        mid_z = Z.shape[2] // 2
        stress_slice = stress[:, :, mid_z]
        X_slice = X[:, :, mid_z]
        Y_slice = Y[:, :, mid_z]

        # Plot the stress distribution
        plt.pcolormesh(X_slice, Y_slice, stress_slice, cmap=cmap, shading='auto', vmin=0, vmax=1)
        plt.colorbar(label='Normalized Stress')
        plt.axis('equal')
        plt.title(f'{material["name"]}\nYoung\'s Modulus: {material["youngsModulus"]} GPa\nYield Strength: {material["yieldStrength"]} MPa')
        plt.xlabel('X (cm)')
        plt.ylabel('Y (cm)')

    # Add a common title
    plt.suptitle(f'Stress Distribution Comparison\nActivity: {force_scenario["name"]} ({force_scenario["force"]}x body weight)\nForce: {actual_force:.1f} N', fontsize=16)

    # Adjust layout
    plt.tight_layout(rect=[0, 0, 1, 0.95])

    plt.savefig(buffer, format='png', dpi=100, bbox_inches='tight')
    plt.close()

    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.read()).decode('utf-8')

    return image_base64

def generate_activity_comparison_plot(material_id, activities, patient_weight, output_path):
    """
    Generate a comparison plot of stress distributions for different activities
    """
    plt.figure(figsize=(15, 10))

    # Create a custom colormap (green to yellow to red)
    colors = [(0, 0.8, 0), (1, 1, 0), (1, 0, 0)]
    cmap = LinearSegmentedColormap.from_list("stress_cmap", colors, N=256)

    # Calculate stress for each activity
    stress_data_list = []
    for i, activity_id in enumerate(activities):
        stress_data = calculate_stress_distribution(material_id, activity_id, patient_weight)
        stress_data_list.append(stress_data)

    # Create subplots
    for i, (activity_id, stress_data) in enumerate(zip(activities, stress_data_list)):
        plt.subplot(1, len(activities), i+1)

        # Extract data for the cross-section
        X = stress_data["X"]
        Y = stress_data["Y"]
        Z = stress_data["Z"]
        stress = stress_data["stress"]
        force_scenario = stress_data["force_scenario"]
        actual_force = stress_data["actual_force"]

        # Create a cross-section at Z=0
        mid_z = Z.shape[2] // 2
        stress_slice = stress[:, :, mid_z]
        X_slice = X[:, :, mid_z]
        Y_slice = Y[:, :, mid_z]

        # Plot the stress distribution
        plt.pcolormesh(X_slice, Y_slice, stress_slice, cmap=cmap, shading='auto', vmin=0, vmax=1)
        plt.colorbar(label='Normalized Stress')
        plt.axis('equal')
        plt.title(f'{force_scenario["name"]}\n({force_scenario["force"]}x body weight)\nForce: {actual_force:.1f} N')
        plt.xlabel('X (cm)')
        plt.ylabel('Y (cm)')

    # Add a common title
    material = material_properties[material_id]
    plt.suptitle(f'Stress Distribution Comparison for {material["name"]}\nPatient Weight: {patient_weight} kg', fontsize=16)

    # Adjust layout
    plt.tight_layout(rect=[0, 0, 1, 0.95])

    # Save the plot
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    plt.close()

    # Also save as base64 for embedding in JSON
    buffer = BytesIO()
    plt.figure(figsize=(15, 10))

    # Create subplots
    for i, (activity_id, stress_data) in enumerate(zip(activities, stress_data_list)):
        plt.subplot(1, len(activities), i+1)

        # Extract data for the cross-section
        X = stress_data["X"]
        Y = stress_data["Y"]
        Z = stress_data["Z"]
        stress = stress_data["stress"]
        force_scenario = stress_data["force_scenario"]
        actual_force = stress_data["actual_force"]

        # Create a cross-section at Z=0
        mid_z = Z.shape[2] // 2
        stress_slice = stress[:, :, mid_z]
        X_slice = X[:, :, mid_z]
        Y_slice = Y[:, :, mid_z]

        # Plot the stress distribution
        plt.pcolormesh(X_slice, Y_slice, stress_slice, cmap=cmap, shading='auto', vmin=0, vmax=1)
        plt.colorbar(label='Normalized Stress')
        plt.axis('equal')
        plt.title(f'{force_scenario["name"]}\n({force_scenario["force"]}x body weight)\nForce: {actual_force:.1f} N')
        plt.xlabel('X (cm)')
        plt.ylabel('Y (cm)')

    # Add a common title
    plt.suptitle(f'Stress Distribution Comparison for {material["name"]}\nPatient Weight: {patient_weight} kg', fontsize=16)

    # Adjust layout
    plt.tight_layout(rect=[0, 0, 1, 0.95])

    plt.savefig(buffer, format='png', dpi=100, bbox_inches='tight')
    plt.close()

    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.read()).decode('utf-8')

    return image_base64

def generate_stress_analysis_data():
    """
    Generate stress analysis data and visualizations for all materials and activities
    """
    # Dictionary to store all the data
    stress_analysis_data = {
        "materials": {},
        "comparisons": {
            "materials": {},
            "activities": {}
        }
    }

    # Standard patient weight
    patient_weight = 70

    # Generate data for each material and activity
    for material_id in material_properties:
        stress_analysis_data["materials"][material_id] = {}

        for activity_id in force_scenarios:
            # Calculate stress distribution
            stress_data = calculate_stress_distribution(material_id, activity_id, patient_weight)

            # Generate 2D plot
            plot_2d_path = os.path.join(output_dir, f"{material_id}_{activity_id}_2d.png")
            image_2d_base64 = generate_2d_stress_plot(stress_data, plot_2d_path)

            # Generate 3D plot
            plot_3d_path = os.path.join(output_dir, f"{material_id}_{activity_id}_3d.png")
            image_3d_base64 = generate_3d_stress_plot(stress_data, plot_3d_path)

            # Store data
            stress_analysis_data["materials"][material_id][activity_id] = {
                "max_stress": float(stress_data["max_stress"]),
                "actual_force": float(stress_data["actual_force"]),
                "plot_2d_path": plot_2d_path.replace("\\", "/"),
                "plot_3d_path": plot_3d_path.replace("\\", "/"),
                "image_2d_base64": image_2d_base64,
                "image_3d_base64": image_3d_base64
            }

    # Generate material comparisons for each activity
    for activity_id in force_scenarios:
        # Compare all materials for this activity
        materials = list(material_properties.keys())
        comparison_path = os.path.join(output_dir, f"comparison_materials_{activity_id}.png")
        image_base64 = generate_stress_comparison_plot(materials, activity_id, patient_weight, comparison_path)

        stress_analysis_data["comparisons"]["materials"][activity_id] = {
            "comparison_path": comparison_path.replace("\\", "/"),
            "image_base64": image_base64
        }

    # Generate activity comparisons for each material
    for material_id in material_properties:
        # Compare all activities for this material
        activities = list(force_scenarios.keys())
        comparison_path = os.path.join(output_dir, f"comparison_activities_{material_id}.png")
        image_base64 = generate_activity_comparison_plot(material_id, activities, patient_weight, comparison_path)

        stress_analysis_data["comparisons"]["activities"][material_id] = {
            "comparison_path": comparison_path.replace("\\", "/"),
            "image_base64": image_base64
        }

    # Save the data to a JSON file
    json_path = os.path.join(output_dir, "stress_analysis_data.json")
    with open(json_path, 'w') as f:
        json.dump(stress_analysis_data, f, indent=2)

    print(f"Stress analysis data and visualizations generated and saved to {output_dir}")
    print(f"JSON data saved to {json_path}")

    return stress_analysis_data

if __name__ == "__main__":
    generate_stress_analysis_data()
