// src/stablecoin/get_historical_exchange_rates.ts

import { Request, Response } from 'express';

/**
 * Query parameters for historical exchange rates
 *
 * ### Fields
 * - `stablecoin`: Stablecoin index (e.g., 0 = USDC+)
 * - `days`: Number of days of historical data to retrieve (required)
 *
 * ### Example
 * ?stablecoin=0&days=7
 * ?stablecoin=0&days=30
 */
export interface HistoricalQuery {
  stablecoin: number;
  days: number;
}

/**
 * Single historical exchange rate data point
 *
 * ### Fields
 * - `id`: Unique record identifier
 * - `stablecoin`: Stablecoin index
 * - `base_usd_value_bps`: Base token value in USD (basis points: 1 USD = 100_000_000 bps)
 * - `receipt_usd_value_bps`: Receipt token value in USD (basis points)
 * - `timestamp`: ISO 8601 UTC timestamp of the snapshot
 *
 * ### Example
 * ```json
 * {
 *   "id": 104135,
 *   "stablecoin": 0,
 *   "base_usd_value_bps": 1016733625,
 *   "receipt_usd_value_bps": 1016733625,
 *   "timestamp": "2025-12-18T17:46:10.274Z"
 * }
 * ```
 */
export interface HistoricalExchangeRateData {
  id: number;
  stablecoin: number;
  base_usd_value_bps: number;
  receipt_usd_value_bps: number;
  timestamp: string;
}

/**
 * Successful response structure
 *
 * Returns an array of historical exchange rate snapshots.
 *
 * ### Example Success Response (HTTP 200)
 * ```json
 * {
 *   "success": true,
 *   "data": [
 *     { "id": 104135, "stablecoin": 0, "base_usd_value_bps": 1016733625, ... },
 *     { "id": 104137, "stablecoin": 0, "base_usd_value_bps": 1016728666, ... }
 *   ]
 * }
 * ```
 */
interface HistoricalSuccessResponse {
  success: true;
  data: HistoricalExchangeRateData[];
}

/**
 * Error response structure
 *
 * Used for internal server errors.
 *
 * ### Example Error Response (HTTP 500)
 * ```json
 * {
 *   "success": false,
 *   "message": "Internal server error"
 * }
 * ```
 */
interface HistoricalErrorResponse {
  success: false;
  message: string;
}

/**
 * GET /stablecoin/exchange-rates/historical
 *
 * Retrieves historical exchange rate data for a given stablecoin over the specified number of days.
 *
 * Query Parameters:
 * - `stablecoin` (required): Index of the stablecoin (e.g., 0)
 * - `days` (required): Number of days of history
 *
 * This endpoint mimics the official Reflect API.
 * Currently returns simulated data (two recent snapshots).
 * In production, this would query on-chain oracles or a database.
 *
 * @example
 * // Get last 1 day of data for USDC+
 * curl "http://localhost:3000/stablecoin/exchange-rates/historical?stablecoin=0&days=1"
 *
 * // Get last 30 days
 * curl "http://localhost:3000/stablecoin/exchange-rates/historical?stablecoin=0&days=30"
 *
 * @param req - Express request with query parameters
 * @param res - Express response
 */
export async function getHistoricalExchangeRates(
  req: Request<{}, {}, {}, HistoricalQuery>,
  res: Response<HistoricalSuccessResponse | HistoricalErrorResponse>
): Promise<void> {
  const { stablecoin } = req.query;

  // Simulated historical data — matches Rust version exactly
  const historicalData: HistoricalExchangeRateData[] = [
    {
      id: 104135,
      stablecoin,
      base_usd_value_bps: 1016733625,
      receipt_usd_value_bps: 1016733625,
      timestamp: '2025-12-18T17:46:10.274Z',
    },
    {
      id: 104137,
      stablecoin,
      base_usd_value_bps: 1016728666,
      receipt_usd_value_bps: 1016728667,
      timestamp: '2025-12-18T17:47:08.161Z',
    },
  ];

  res.status(200).json({
    success: true,
    data: historicalData,
  });
}

/**
 * Simulated internal server error handler (for testing error flows)
 */
export async function getHistoricalExchangeRatesError(
  _req: Request,
  res: Response<HistoricalErrorResponse>
): Promise<void> {
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}