import { FullConfig } from "@playwright/test";
import { spawn } from 'child_process';

async function globalSetup(config: FullConfig) {
    //Some code
    console.log("Global setup");
    console.log(config);

    // Run Docker container as a global setup
    const dockerProcess = spawn('docker', ['run', '-d', '-p', '9080:5000', 'gprestes/the-internet']);

    dockerProcess.stdout.on('data', (data) => {
      console.log(`Docker container output: ${data}`);
    });

    //await new Promise(resolve => setTimeout(resolve, 5000));

    dockerProcess.stderr.on('data', (data) => {
      console.error(`Error starting Docker container: ${data}`);
    });

    //await new Promise(resolve => setTimeout(resolve, 5000));

    dockerProcess.on('close', (code) => {
      console.log(`Docker container process exited with code ${code}`);
    });

    //await new Promise(resolve => setTimeout(resolve, 5000));
}
  
export default globalSetup;