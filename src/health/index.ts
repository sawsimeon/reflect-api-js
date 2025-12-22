// src/health/index.ts

import { Router } from 'express';
import { healthCheck } from './health_check'; // We'll update health_check.ts to export the handler directly
import type { AppState } from '../types'; // Adjust path if your AppState type is defined elsewhere

/**
 * Creates and configures the health router.
 * Mounts the GET /health endpoint.
 *
 * @param state - Shared application state (if needed in the future)
 * @returns Configured Express Router for health-related routes
 */
export function createHealthRouter(state?: AppState): Router {
  const router = Router();

  // GET /health - Health check endpoint mimicking Reflect API
  router.get('/health', healthCheck);

  return router;
}

// Default export for convenience when importing the router directly
export default createHealthRouter;