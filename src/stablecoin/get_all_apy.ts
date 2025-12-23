// src/stablecoin/get_all_apy.ts

import { Request, Response } from 'express';

/**
 * APY data for a single stablecoin
 *
 * ### Fields
 * - `index`: The stablecoin index (e.g., 0 = USDC+)
 * - `apy`: Annual Percentage Yield in **basis points** (e.g., 224 = 2.24%)
 * - `timestamp`: ISO 8601 UTC timestamp when this APY was recorded
 *
 * ### Example
 * ```json
 * {
 *   "index": 0,
 *   "apy": 224,
 *   "timestamp": "2025-12-19T16:55:42.407Z"
 * }
 * ```
 */
export interface ApyData {
  index: number;
  apy: number; // in basis points (1% = 100 bps)
  timestamp: string;
}

/**
 * Successful response structure for GET /stablecoin/apy
 *
 * ### Example Success Response (HTTP 200)
 * ```json
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "index": 0,
 *       "apy": 224,
 *       "timestamp": "2025-12-19T16:55:42.407Z"
 *     }
 *   ]
 * }
 * ```
 */
interface ApySuccessResponse {
  success: true;
  data: ApyData[];
}

/**
 * Error response structure
 *
 * Used for 404, 500, etc.
 *
 * ### Example Error Response
 * ```json
 * {
 *   "success": false,
 *   "message": "Internal server error"
 * }
 * ```
 */
interface ApyErrorResponse {
  success: false;
  message: string;
}

/**
 * GET /stablecoin/apy
 *
 * Returns current APY (Annual Percentage Yield) for all available stablecoins.
 *
 * This endpoint mimics the official Reflect API and currently returns simulated data.
 * In production, this would fetch real-time or cached APY from on-chain programs
 * or an oracle.
 *
 * No authentication or query parameters required.
 *
 * @example
 * curl http://localhost:3000/stablecoin/apy
 *
 * @param _req - Express request (unused)
 * @param res - Express response
 */
export async function getAllApy(
  _req: Request,
  res: Response<ApySuccessResponse | ApyErrorResponse>
): Promise<void> {
  // Simulated APY data — matches Rust version exactly
  const apyData: ApyData[] = [
    {
      index: 0,
      apy: 224, // 2.24%
      timestamp: '2025-12-19T16:55:42.407Z',
    },
  ];

  res.status(200).json({
    success: true,
    data: apyData,
  });
}

/**
 * Simulated 404 handler (for testing error flows)
 *
 * Note: The message here is reused from mint/burn validation for simplicity in scaffold.
 */
export async function getAllApyNotFound(
  _req: Request,
  res: Response<ApyErrorResponse>
): Promise<void> {
  res.status(404).json({
    success: false,
    message: 'Invalid request data: depositAmount must be positive',
  });
}

/**
 * Simulated internal server error handler (for testing)
 */
export async function getAllApyError(
  _req: Request,
  res: Response<ApyErrorResponse>
): Promise<void> {
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}