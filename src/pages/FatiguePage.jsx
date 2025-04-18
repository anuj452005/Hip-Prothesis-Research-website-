import React from 'react';
import { Line } from 'react-chartjs-2';
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

const FatiguePage = () => {
  // S-N curve data for different materials
  const snCurveData = {
    labels: ['1e4', '1e5', '1e6', '1e7', '1e8', '1e9'],
    datasets: [
      {
        label: 'Titanium Alloy (Ti-6Al-4V)',
        data: [700, 600, 500, 450, 420, 400],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Cobalt-Chromium Alloy',
        data: [800, 650, 550, 500, 480, 470],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
      {
        label: 'Stainless Steel (316L)',
        data: [600, 500, 400, 350, 320, 300],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      }
    ],
  };

  const snCurveOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'S-N Curves for Hip Prosthesis Materials',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Number of Cycles to Failure (log scale)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Stress Amplitude (MPa)',
        },
      },
    },
  };

  return (
    <div className="fatigue-page">
      <h1>Fatigue Analysis</h1>
      
      <section className="fatigue-concepts">
        <h2>Fatigue Concepts in Hip Prostheses</h2>
        <div className="concepts-grid">
          <div className="concept-card">
            <h3>What is Fatigue?</h3>
            <p>
              Fatigue is the progressive structural damage that occurs when a material is subjected to cyclic loading. 
              In hip prostheses, each step a patient takes creates cyclic stresses that can eventually lead to failure 
              if the implant is not properly designed to withstand these repeated loads.
            </p>
          </div>
          
          <div className="concept-card">
            <h3>S-N Curve</h3>
            <p>
              The S-N curve (Stress vs. Number of cycles) shows the relationship between stress amplitude and the number 
              of cycles to failure. It is a fundamental tool for predicting the fatigue life of hip prosthesis materials.
            </p>
          </div>
          
          <div className="concept-card">
            <h3>Endurance Limit</h3>
            <p>
              The endurance limit is the stress level below which a material can theoretically endure an infinite number 
              of stress cycles without failure. For hip prostheses, materials with higher endurance limits are preferred 
              for long-term implantation.
            </p>
          </div>
          
          <div className="concept-card">
            <h3>Fatigue Life</h3>
            <p>
              Fatigue life refers to the number of stress cycles a material can withstand before failure at a given stress 
              level. Hip prostheses should be designed to have a fatigue life exceeding the expected number of loading 
              cycles during the patient's lifetime.
            </p>
          </div>
        </div>
      </section>
      
      <section className="sn-curve-section">
        <h2>S-N Curves for Hip Prosthesis Materials</h2>
        <div className="chart-container">
          <Line data={snCurveData} options={snCurveOptions} />
        </div>
        <div className="chart-explanation">
          <p>
            The S-N curves above show how different materials used in hip prostheses respond to cyclic loading. 
            Materials with higher curves have better fatigue resistance. Note that:
          </p>
          <ul>
            <li>Cobalt-chromium alloys typically show the highest fatigue strength</li>
            <li>Titanium alloys have good fatigue properties and better biocompatibility</li>
            <li>Stainless steel has lower fatigue resistance but is more cost-effective</li>
            <li>The average person takes 1-2 million steps per year, meaning a hip prosthesis must withstand 
                20-40 million cycles over a 20-year lifespan</li>
          </ul>
        </div>
      </section>
      
      <section className="failure-modes">
        <h2>Common Fatigue Failure Modes</h2>
        <div className="failure-grid">
          <div className="failure-card">
            <h3>Fretting Fatigue</h3>
            <div className="failure-content">
              <div className="failure-image">
                {/* Placeholder for fretting image */}
                <div className="placeholder-image">Fretting Image</div>
              </div>
              <div className="failure-description">
                <p>
                  Fretting occurs at the interface between two contacting surfaces that experience small relative motion. 
                  In hip prostheses, fretting is common at modular junctions (e.g., between the femoral head and stem) 
                  and can accelerate fatigue crack initiation.
                </p>
                <p>
                  <strong>Prevention:</strong> Improved surface treatments, optimized component design, and proper 
                  material selection can reduce fretting damage.
                </p>
              </div>
            </div>
          </div>
          
          <div className="failure-card">
            <h3>Corrosion Fatigue</h3>
            <div className="failure-content">
              <div className="failure-image">
                {/* Placeholder for corrosion image */}
                <div className="placeholder-image">Corrosion Image</div>
              </div>
              <div className="failure-description">
                <p>
                  Corrosion fatigue is the combined effect of cyclic loading and corrosive environment. The body's 
                  fluid environment can accelerate fatigue damage in hip prostheses, particularly at sites of stress 
                  concentration.
                </p>
                <p>
                  <strong>Prevention:</strong> Using corrosion-resistant materials like titanium alloys and 
                  applying protective coatings can mitigate corrosion fatigue.
                </p>
              </div>
            </div>
          </div>
          
          <div className="failure-card">
            <h3>Stress Concentration Fracture</h3>
            <div className="failure-content">
              <div className="failure-image">
                {/* Placeholder for stress concentration image */}
                <div className="placeholder-image">Stress Concentration Image</div>
              </div>
              <div className="failure-description">
                <p>
                  Stress concentrations occur at geometric discontinuities like sharp corners, notches, or sudden 
                  changes in cross-section. These areas experience higher local stresses and are common sites for 
                  fatigue crack initiation in hip prostheses.
                </p>
                <p>
                  <strong>Prevention:</strong> Design optimization with smooth transitions, fillets, and rounded 
                  edges can reduce stress concentrations.
                </p>
              </div>
            </div>
          </div>
          
          <div className="failure-card">
            <h3>Manufacturing Defect Failure</h3>
            <div className="failure-content">
              <div className="failure-image">
                {/* Placeholder for manufacturing defect image */}
                <div className="placeholder-image">Manufacturing Defect Image</div>
              </div>
              <div className="failure-description">
                <p>
                  Manufacturing defects like porosity, inclusions, or surface irregularities can act as fatigue 
                  crack initiation sites. These defects reduce the effective load-bearing area and create local 
                  stress concentrations.
                </p>
                <p>
                  <strong>Prevention:</strong> Stringent quality control, advanced manufacturing techniques, and 
                  post-manufacturing inspections help minimize defects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="fatigue-testing">
        <h2>Fatigue Testing Methods</h2>
        <div className="testing-content">
          <p>
            Hip prostheses undergo rigorous fatigue testing before clinical use to ensure they can withstand the 
            demands of daily activities. Common testing methods include:
          </p>
          <ul>
            <li>
              <strong>ISO 7206 Testing:</strong> Standardized test that simulates the loading conditions experienced 
              by the femoral component during walking and other activities.
            </li>
            <li>
              <strong>Hip Simulator Testing:</strong> Replicates the complex loading and motion patterns of the hip 
              joint during various activities to assess both fatigue and wear performance.
            </li>
            <li>
              <strong>Finite Element Analysis (FEA):</strong> Computational method to predict stress distributions 
              and potential failure locations in prosthesis designs before physical testing.
            </li>
            <li>
              <strong>Accelerated Fatigue Testing:</strong> Applies higher-than-normal loads to expedite the testing 
              process while still providing valuable data on fatigue performance.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default FatiguePage;
