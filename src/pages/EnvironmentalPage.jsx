import React from 'react';

const EnvironmentalPage = () => {
  return (
    <div className="environmental-page">
      <h1>Environmental Impact</h1>

      <section className="intro-section">
        <p className="intro-text">
          The environmental impact of hip prostheses extends from raw material extraction through manufacturing,
          use, and end-of-life disposal. As healthcare increasingly considers sustainability, understanding these
          impacts becomes essential for developing more environmentally friendly medical devices.
        </p>
      </section>

      <section className="materials-impact">
        <h2>Environmental Impact of Materials</h2>
        <div className="impact-grid">
          <div className="impact-card">
            <h3>Titanium Alloys</h3>
            <div className="impact-metrics">
              <div className="metric">
                <span className="metric-label">Energy Consumption:</span>
                <span className="metric-value high">High</span>
              </div>
              <div className="metric">
                <span className="metric-label">CO₂ Emissions:</span>
                <span className="metric-value high">High</span>
              </div>
              <div className="metric">
                <span className="metric-label">Resource Depletion:</span>
                <span className="metric-value medium">Medium</span>
              </div>
              <div className="metric">
                <span className="metric-label">Recyclability:</span>
                <span className="metric-value high">High</span>
              </div>
            </div>
            <p className="impact-description">
              Titanium extraction and processing are energy-intensive, requiring approximately 361,000 MJ of energy
              per ton. However, titanium's durability and recyclability partially offset its initial environmental
              impact. Titanium mining can cause habitat disruption and water pollution if not properly managed.
            </p>
          </div>

          <div className="impact-card">
            <h3>Cobalt-Chromium Alloys</h3>
            <div className="impact-metrics">
              <div className="metric">
                <span className="metric-label">Energy Consumption:</span>
                <span className="metric-value high">High</span>
              </div>
              <div className="metric">
                <span className="metric-label">CO₂ Emissions:</span>
                <span className="metric-value high">High</span>
              </div>
              <div className="metric">
                <span className="metric-label">Resource Depletion:</span>
                <span className="metric-value high">High</span>
              </div>
              <div className="metric">
                <span className="metric-label">Recyclability:</span>
                <span className="metric-value medium">Medium</span>
              </div>
            </div>
            <p className="impact-description">
              Cobalt mining has significant environmental and social concerns, particularly in the Democratic Republic
              of Congo. Issues include habitat destruction, water pollution, and human rights concerns. Chromium
              processing also generates hazardous waste that requires careful management.
            </p>
          </div>

          <div className="impact-card">
            <h3>Stainless Steel</h3>
            <div className="impact-metrics">
              <div className="metric">
                <span className="metric-label">Energy Consumption:</span>
                <span className="metric-value medium">Medium</span>
              </div>
              <div className="metric">
                <span className="metric-label">CO₂ Emissions:</span>
                <span className="metric-value medium">Medium</span>
              </div>
              <div className="metric">
                <span className="metric-label">Resource Depletion:</span>
                <span className="metric-value medium">Medium</span>
              </div>
              <div className="metric">
                <span className="metric-label">Recyclability:</span>
                <span className="metric-value high">High</span>
              </div>
            </div>
            <p className="impact-description">
              Stainless steel production has a lower environmental impact than titanium but still requires significant
              energy. The steel industry accounts for approximately 7-9% of global CO₂ emissions. However, stainless
              steel is highly recyclable, with recycling rates exceeding 80% in many developed countries.
            </p>
          </div>

          <div className="impact-card">
            <h3>Ceramics</h3>
            <div className="impact-metrics">
              <div className="metric">
                <span className="metric-label">Energy Consumption:</span>
                <span className="metric-value high">High</span>
              </div>
              <div className="metric">
                <span className="metric-label">CO₂ Emissions:</span>
                <span className="metric-value medium">Medium</span>
              </div>
              <div className="metric">
                <span className="metric-label">Resource Depletion:</span>
                <span className="metric-label">Resource Depletion:</span>
                <span className="metric-value low">Low</span>
              </div>
              <div className="metric">
                <span className="metric-label">Recyclability:</span>
                <span className="metric-value low">Low</span>
              </div>
            </div>
            <p className="impact-description">
              Ceramic production requires high-temperature firing (&gt;1400°C), consuming substantial energy. Raw materials
              like alumina and zirconia are relatively abundant. However, ceramics are difficult to recycle once
              manufactured into medical components.
            </p>
          </div>

          <div className="impact-card">
            <h3>Polyethylene</h3>
            <div className="impact-metrics">
              <div className="metric">
                <span className="metric-label">Energy Consumption:</span>
                <span className="metric-value low">Low</span>
              </div>
              <div className="metric">
                <span className="metric-label">CO₂ Emissions:</span>
                <span className="metric-value medium">Medium</span>
              </div>
              <div className="metric">
                <span className="metric-label">Resource Depletion:</span>
                <span className="metric-value high">High</span>
              </div>
              <div className="metric">
                <span className="metric-label">Recyclability:</span>
                <span className="metric-value low">Low</span>
              </div>
            </div>
            <p className="impact-description">
              As a petroleum-based plastic, polyethylene contributes to fossil fuel depletion. Medical-grade UHMWPE
              is rarely recycled due to contamination concerns and specialized formulations. However, its production
              requires less energy than metals or ceramics.
            </p>
          </div>
        </div>
      </section>

      <section className="manufacturing-impact">
        <h2>Environmental Impact of Manufacturing Processes</h2>
        <div className="process-comparison">
          <table className="process-table">
            <thead>
              <tr>
                <th>Manufacturing Process</th>
                <th>Energy Consumption</th>
                <th>Material Waste</th>
                <th>Water Usage</th>
                <th>Chemical Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Casting</td>
                <td>High</td>
                <td>Medium</td>
                <td>Medium</td>
                <td>High</td>
              </tr>
              <tr>
                <td>CNC Machining</td>
                <td>Medium</td>
                <td>High</td>
                <td>Medium</td>
                <td>Medium</td>
              </tr>
              <tr>
                <td>Forging</td>
                <td>High</td>
                <td>Low</td>
                <td>Low</td>
                <td>Low</td>
              </tr>
              <tr>
                <td>3D Printing</td>
                <td>Medium</td>
                <td>Low</td>
                <td>Low</td>
                <td>Medium</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="process-details">
          <div className="process-detail">
            <h3>Casting</h3>
            <p>
              Investment casting for hip prostheses generates significant waste from ceramic shell materials and
              requires high energy for melting metals. The process also uses chemicals for mold preparation and
              cleaning that can be environmentally harmful if not properly managed.
            </p>
          </div>

          <div className="process-detail">
            <h3>CNC Machining</h3>
            <p>
              CNC machining can waste up to 80% of the starting material as chips and swarf. While these can be
              recycled, the process requires cutting fluids that need proper disposal. Energy consumption is
              moderate compared to other processes.
            </p>
          </div>

          <div className="process-detail">
            <h3>Forging</h3>
            <p>
              Forging requires high temperatures and pressures, consuming significant energy. However, it produces
              minimal material waste and typically uses fewer chemicals than other processes. The improved mechanical
              properties may also extend implant lifespan, reducing lifetime environmental impact.
            </p>
          </div>

          <div className="process-detail">
            <h3>3D Printing</h3>
            <p>
              Additive manufacturing minimizes material waste but requires fine metal powders that have energy-intensive
              production processes. The technology allows for optimized designs that use less material and potentially
              create longer-lasting implants, reducing lifetime environmental impact.
            </p>
          </div>
        </div>
      </section>

      <section className="lifecycle-impact">
        <h2>Life Cycle Assessment</h2>
        <div className="lifecycle-diagram">
          {/* Placeholder for lifecycle diagram */}
          <div className="placeholder-image">Life Cycle Diagram</div>
        </div>
        <div className="lifecycle-stages">
          <div className="lifecycle-stage">
            <h3>Raw Material Extraction</h3>
            <p>
              The environmental footprint begins with mining and processing raw materials. This stage typically
              accounts for 30-40% of the total environmental impact of a hip prosthesis.
            </p>
          </div>

          <div className="lifecycle-stage">
            <h3>Manufacturing</h3>
            <p>
              Energy-intensive processes and material waste during manufacturing contribute approximately 20-30%
              of the total environmental impact.
            </p>
          </div>

          <div className="lifecycle-stage">
            <h3>Packaging & Distribution</h3>
            <p>
              Sterile packaging requirements and global distribution networks add 5-10% to the environmental footprint.
            </p>
          </div>

          <div className="lifecycle-stage">
            <h3>Clinical Use</h3>
            <p>
              The use phase has minimal direct environmental impact, but revision surgeries due to implant failure
              significantly increase the lifetime environmental footprint.
            </p>
          </div>

          <div className="lifecycle-stage">
            <h3>End-of-Life</h3>
            <p>
              Most explanted prostheses are treated as medical waste and incinerated or landfilled rather than recycled,
              accounting for 10-15% of the environmental impact.
            </p>
          </div>
        </div>
      </section>

      <section className="sustainable-alternatives">
        <h2>Sustainable Alternatives & Future Directions</h2>
        <div className="alternatives-grid">
          <div className="alternative-card">
            <h3>Biomaterials Research</h3>
            <p>
              Research into biodegradable and bio-based materials could reduce dependence on metal alloys.
              Magnesium alloys that safely degrade in the body and composite materials reinforced with natural
              fibers show promise for certain orthopedic applications.
            </p>
          </div>

          <div className="alternative-card">
            <h3>Design Optimization</h3>
            <p>
              Topology optimization and generative design can reduce material usage by 30-50% while maintaining
              mechanical performance. These computer-aided techniques create organic structures that use material
              only where needed for load-bearing.
            </p>
          </div>

          <div className="alternative-card">
            <h3>Cleaner Manufacturing</h3>
            <p>
              Renewable energy in manufacturing facilities, closed-loop water systems, and solvent-free cleaning
              processes can significantly reduce the environmental footprint of prosthesis production.
            </p>
          </div>

          <div className="alternative-card">
            <h3>Recycling Programs</h3>
            <p>
              Developing specialized recycling programs for explanted prostheses could recover valuable metals.
              After proper sterilization, materials like titanium and cobalt-chromium can be recycled into new
              medical or industrial products.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnvironmentalPage;
