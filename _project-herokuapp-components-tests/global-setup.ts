import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile } from 'fs/promises';

const execAsync = promisify(exec);

async function startDockerContainer() {
    const dockerStartCommand = 'docker run -d -p 5000:5000 -h heroku-app-container gprestes/the-internet';
    try {
        const { stdout, stderr } = await execAsync(dockerStartCommand);
        console.log('Docker Start STDOUT:', stdout);
        console.error('Docker Start STDERR:', stderr);
    } catch (error) {
        console.error('Error starting Docker container:', error);
        throw error; // Re-throw the error to fail the setup process.
    }
}

async function globalSetup() {
  await startDockerContainer();
  const appUrl = 'http://localhost:5000'; // Adjust as needed for your app.

  await writeFile('playwright-config.json', JSON.stringify({ appUrl }));
}
  
export default globalSetup;