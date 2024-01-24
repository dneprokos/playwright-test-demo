import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function stopDockerContainer() {
    const dockerStopCommand = 'docker stop heroku-app-container'; // Adjust this command.
    try {
        const { stdout, stderr } = await execAsync(dockerStopCommand);
        console.log('Docker Stop STDOUT:', stdout);
        console.error('Docker Stop STDERR:', stderr);
    } catch (error) {
        console.error('Error stopping Docker container:', error);
        // Optionally handle the error, but generally, teardown errors are not re-thrown.
    }
}

async function globalTeardown() {
  await stopDockerContainer();
}

export default globalTeardown;