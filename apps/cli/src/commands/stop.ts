/**
 * `shannon stop` command — stop workers and infrastructure.
 */

import { execFileSync } from 'node:child_process';
import * as p from '@clack/prompts';
import { stopInfra, stopWorkers } from '../docker.js';

function isDockerAvailable(): boolean {
  try {
    execFileSync('docker', ['version'], { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

export async function stop(clean: boolean): Promise<void> {
  if (!isDockerAvailable()) {
    console.error('ERROR: Docker is not installed or not running.');
    console.error('Vedha requires Docker to manage containers. Install Docker Desktop:');
    console.error('  https://docs.docker.com/get-docker/');
    process.exit(1);
  }

  if (clean) {
    const confirmed = await p.confirm({
      message: 'This will stop all running scans and remove the Temporal data. Continue?',
    });
    if (p.isCancel(confirmed) || !confirmed) {
      p.cancel('Aborted.');
      process.exit(0);
    }
  }

  stopWorkers();
  stopInfra(clean);
}
