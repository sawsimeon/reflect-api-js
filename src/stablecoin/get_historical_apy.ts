// src/stablecoin/get_historical_apy.ts

import { Request, Response } from 'express';

/**
 * Query parameters for historical APY retrieval
 *
 * ### Fields
 * - `days`: Number of days of historical data to return
 *           (optional, defaults to 365, must be >= 1)
 *
 * ### Example
 * ?days=30
 * ?days=365
 */
export interface HistoricalApyQuery {
  days?: number;
}

/**
 * Historical APY data point for a specific stablecoin
 *
 * ### Fields
 * - `index`: Stablecoin index (e.g., 0 = USDC+)
 * - `apy`: Annual Percentage Yield as a decimal (e.g., 5.25 = 5.25%)
 * - `timestamp`: ISO 8601 UTC timestamp of the data point
 *
 * ### Example
 * ```json
 * {
 *   "index": 0,
 *   "apy": 5.25,
 *   "timestamp": "2023-11-07T05:31:56Z"
 * }
 * ```
 */
export interface HistoricalApyData {
  index: number;
  apy: number;
  timestamp: string;
}

/**
 * Successful response structure
 *
 * ### Example Success Response (HTTP 200)
 * ```json
 * {
 *   "success": true,
 *   "data": {
 *     "index": 0,
 *     "apy": 5.25,
 *     "timestamp": "2023-11-07T05:31:56Z"
 *   }
 * }
 * ```
 */
interface HistoricalApySuccessResponse {
  success: true;
  data: HistoricalApyData;
}

/**
 * Error response structure
 *
 * Used for validation errors (400) or internal errors (500).
 *
 * ### Example Error Response
 * ```json
 * {
 *   "success": false,
 *   "message": "Invalid request data: depositAmount must be positive"
 * }
 * ```
 */
interface HistoricalApyErrorResponse {
  success: false;
  message: string;
}

/**
 * GET /stablecoin/:index/apy/historical
 *
 * Retrieves historical APY data for a specific stablecoin over the requested time period.
 *
 * Path parameter:
 * - `:index` — Stablecoin index (currently only 0 supported)
 *
 * Query parameter:
 * - `days` — Number of days of history (default: 365, minimum: 1)
 *
 * This endpoint mimics the official Reflect API behavior.
 * Currently returns simulated data (single latest APY point).
 * In production, this would return an array or aggregated historical data.
 *
 * @example
 * // Request 1 year of historical APY for USDC+
 * curl "http://localhost:3000/stablecoin/0/apy/historical?days=365"
 *
 * // Request 30 days
 * curl "http://localhost:3000/stablecoin/0/apy/historical?days=30"
 *
 * // Default (365 days)
 * curl "http://localhost:3000/stablecoin/0/apy/historical"
 *
 * @param req - Express request with path param `index` and query `days`
 * @param res - Express response
 */
export async function getHistoricalApy(
  req: Request<{ index: string }, {}, {}, HistoricalApyQuery>,
  res: Response<HistoricalApySuccessResponse | HistoricalApyErrorResponse>
): Promise<void> {
  const index = Number(req.params.index);
  const days = req.query.days ?? 365;

  // Validate days >= 1
  if (days < 1) {
    res.status(400).json({
      success: false,
      message: 'Invalid request data: depositAmount must be positive',
    });
    return;
  }

  // Simulated historical APY data — matches Rust scaffold exactly
  const historicalData: HistoricalApyData = {
    index,
    apy: 5.25, // 5.25%
    timestamp: '2023-11-07T05:31:56Z',
  };

  res.status(200).json({
    success: true,
    data: historicalData,
  });
}

/**
 * Simulated internal server error handler (for testing error flows)
 */
export async function getHistoricalApyError(
  _req: Request,
  res: Response<HistoricalApyErrorResponse>
): Promise<void> {
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}