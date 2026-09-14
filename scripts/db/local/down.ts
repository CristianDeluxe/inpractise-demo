import { execFileSync } from 'node:child_process'
import { localContainerName } from './localContainerName.ts'

execFileSync('docker', ['rm', '-f', localContainerName], { stdio: 'inherit' })
