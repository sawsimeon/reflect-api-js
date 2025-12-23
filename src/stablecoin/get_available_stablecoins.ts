// src/stablecoin/get_available_stablecoins.ts

import { Request, Response } from 'express';

/**
 * Represents a single available stablecoin type
 *
 * ### Fields
 * - `index`: Unique identifier for the stablecoin (e.g., 0 = USDC+)
 * - `name`: Human-readable name of the stablecoin
 *
 * ### Example
 * ```json
 * {
 *   "index": 0,
 *   "name": "USDC+"
 * }
 * ```
 */
export interface Stablecoin {
  index: number;
  name: string;
}

/**
 * Successful response structure for GET /stablecoin/types
 *
 * Matches the official Reflect API exactly.
 *
 * ### Example Success Response (HTTP 200)
 * ```json
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "index": 0,
 *       "name": "USDC+"
 *     }
 *   ]
 * }
 * ```
 */
interface StablecoinSuccessResponse {
  success: true;
  data: Stablecoin[];
}

/**
 * Error response structure
 *
 * Used for internal errors (e.g., 500).
 *
 * ### Example Error Response (HTTP 500)
 * ```json
 * {
 *   "success": false,
 *   "message": "Internal server error"
 * }
 * ```
 */
interface StablecoinErrorResponse {
  success: false;
  message: string;
}

/**
 * GET /stablecoin/types
 *
 * Returns a list of all currently available stablecoin types supported by the Reflect protocol.
 *
 * This endpoint mimics the official Reflect API:
 *   curl https://prod.api.reflect.money/stablecoin/types
 *
 * In this scaffold, we return a static list with only USDC+ (index 0).
 * In production, this would be populated from on-chain data, a config file, or a database.
 *
 * No authentication or query parameters required.
 *
 * @example
 * // Using curl
 * curl http://localhost:3000/stablecoin/types
 *
 * // Expected output
 * {
 *   "success": true,
 *   "data": [
 *     { "index": 0, "name": "USDC+" }
 *   ]
 * }
 *
 * @param _req - Express request object (unused)
 * @param res  - Express response object
 */
export async function getAvailableStablecoins(
  _req: Request,
  res: Response<StablecoinSuccessResponse | StablecoinErrorResponse>
): Promise<void> {
  // Static list of available stablecoins — matches the Rust scaffold
  const stablecoins: Stablecoin[] = [
    {
      index: 0,
      name: 'USDC+',
    },
  ];

  res.status(200).json({
    success: true,
    data: stablecoins,
  });
}

/**
 * Simulated error handler for testing error flows
 *
 * In production, this could be triggered by a failed database query or network issue.
 */
export async function getAvailableStablecoinsError(
  _req: Request,
  res: Response<StablecoinErrorResponse>
): Promise<void> {
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}