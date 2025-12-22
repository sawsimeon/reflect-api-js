// src/health/health_check.ts

import { Request, Response } from 'express';

/**
 * Response structure for the `/health` endpoint.
 * Exactly matches the official Reflect API specification.
 *
 * ### Fields
 * - `success`: Always `true` when the server is healthy.
 * - `message`: Fixed human-readable status message.
 * - `timestamp`: Current UTC timestamp in ISO 8601 format with milliseconds and 'Z' suffix.
 *
 * ### Example Response
 * ```json
 * {
 *   "success": true,
 *   "message": "API is running",
 *   "timestamp": "2025-12-22T14:30:45.789Z"
 * }
 * ```
 */
export interface HealthResponse {
  success: true;
  message: 'API is running';
  timestamp: string;
}

/**
 * GET /health - Health Check Handler
 *
 * Mimics the official Reflect API endpoint:
 *   curl https://prod.api.reflect.money/health
 *
 * This endpoint:
 * - Requires no authentication
 * - Performs no side effects or external calls
 * - Always returns HTTP 200 with a healthy JSON response
 * - Includes a precise UTC timestamp matching Rust's `%Y-%m-%dT%H:%M:%S.%3fZ` format
 *
 * The timestamp is generated using `new Date().toISOString()`, which produces
 * the exact required format: `YYYY-MM-DDTHH:mm:ss.SSSZ`
 *
 * @param _req - Express request object (unused)
 * @param res  - Express response object
 */
export function healthCheck(_req: Request, res: Response<HealthResponse>): void {
  const timestamp = new Date().toISOString();

  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp,
  });
}