import { FullConfig } from "@playwright/test";
import { exec } from 'child_process';

async function globalTeardown(config: FullConfig) {
    // Stop and remove the Docker container as a global teardown
    const stopCommand = 'docker stop $(docker ps -q --filter ancestor=gprestes/the-internet)';
    const removeCommand = 'docker rm $(docker ps -a -q --filter ancestor=gprestes/the-internet)';

    exec(stopCommand, (err, stdout) => {
      if (err) {
        console.error(`Error stopping Docker container: ${err}`);
        return;
      }
      console.log(`Stopped Docker container: ${stdout}`);
    });

    exec(removeCommand, (err, stdout) => {
      if (err) {
        console.error(`Error removing Docker container: ${err}`);
        return;
      }
      console.log(`Removed Docker container: ${stdout}`);
    });
}

export default globalTeardown;