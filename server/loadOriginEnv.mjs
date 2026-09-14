// cPanel's Node selector starts the app without the deployment .env, so the
// origin reads it here. Values are never logged; only the absence is reported.
export function loadOriginEnv(path) {
  try {
    process.loadEnvFile(path)
  } catch {
    console.warn(`origin env file not loaded: ${path}`)
  }
}
