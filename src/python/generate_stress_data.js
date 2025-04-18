const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Create the data directory if it doesn't exist
const dataDir = path.join(__dirname, '..', 'data', 'stress_analysis');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Run the Python script
console.log('Generating stress analysis data...');
const pythonProcess = spawn('python', [path.join(__dirname, 'stress_analysis.py')]);

pythonProcess.stdout.on('data', (data) => {
  console.log(`Python output: ${data}`);
});

pythonProcess.stderr.on('data', (data) => {
  console.error(`Python error: ${data}`);
});

pythonProcess.on('close', (code) => {
  console.log(`Python process exited with code ${code}`);
  if (code === 0) {
    console.log('Stress analysis data generated successfully!');
    console.log(`Data saved to ${dataDir}`);
  } else {
    console.error('Error generating stress analysis data.');
  }
});
