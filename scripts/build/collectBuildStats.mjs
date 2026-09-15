import { writeBuildStats } from './writeBuildStats.mjs'

// Run from the repository root: node scripts/build/collectBuildStats.mjs
console.log(await writeBuildStats())
