/**
 * `shannon build` command — build the worker Docker image locally.
 * Only available in local mode (running from cloned repository).
 */

import { execFileSync } from 'node:child_process';
import { buildImage } from '../docker.js';
import { isLocal } from '../mode.js';

function isDockerAvailable(): boolean {
  try {
    execFileSync('docker', ['version'], { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

export function build(noCache: boolean): void {
  if (!isLocal()) {
    console.error('ERROR: Build is only available when running from the Vedha repository');
    console.error('  (Dockerfile not found in current directory)');
    console.error('');
    console.error('For npx usage, run: shannon update');
    process.exit(1);
  }

  if (!isDockerAvailable()) {
    console.error('ERROR: Docker is not installed or not running.');
    console.error('Vedha requires Docker to build the worker image. Install Docker Desktop:');
    console.error('  https://docs.docker.com/get-docker/');
    process.exit(1);
  }

  buildImage(noCache);
}
