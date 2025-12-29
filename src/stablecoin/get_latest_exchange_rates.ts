// src/stablecoin/get_latest_exchange_rates.ts

import { Request, Response } from 'express';

/**
 * Single latest exchange rate data point for a stablecoin
 *
 * ### Fields
 * - `id`: Unique record identifier from the oracle/feed
 * - `stablecoin`: Stablecoin index (e.g., 0 = USDC+)
 * - `base_usd_value_bps`: Value of the base collateral in USD, in basis points
 *                         (1 USD = 100_000_000 bps)
 * - `receipt_usd_value_bps`: Value of the receipt token (stablecoin) in USD, in basis points
 * - `timestamp`: ISO 8601 UTC timestamp of this rate snapshot
 *
 * ### Example
 * ```json
 * {
 *   "id": 105511,
 *   "stablecoin": 0,
 *   "base_usd_value_bps": 1016789908,
 *   "receipt_usd_value_bps": 1016791576,
 *   "timestamp": "2025-12-19T17:04:08.502Z"
 * }
 * ```
 */
export interface ExchangeRateData {
  id: number;
  stablecoin: number;
  base_usd_value_bps: number;
  receipt_usd_value_bps: number;
  timestamp: string;
}

/**
 * Successful response structure for latest exchange rates
 *
 * Returns an array with the most recent rate(s) for all supported stablecoins.
 *
 * ### Example Success Response (HTTP 200)
 * ```json
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "id": 105511,
 *       "stablecoin": 0,
 *       "base_usd_value_bps": 1016789908,
 *       "receipt_usd_value_bps": 1016791576,
 *       "timestamp": "2025-12-19T17:04:08.502Z"
 *     }
 *   ]
 * }
 * ```
 */
interface ExchangeRateSuccessResponse {
  success: true;
  data: ExchangeRateData[];
}

/**
 * Error response structure
 *
 * Used for internal errors (e.g., oracle failure).
 *
 * ### Example Error Response (HTTP 500)
 * ```json
 * {
 *   "success": false,
 *   "message": "Internal server error"
 * }
 * ```
 */
interface ExchangeRateErrorResponse {
  success: false;
  message: string;
}

/**
 * GET /stablecoin/exchange-rates
 *
 * Returns the **latest** exchange rate data for all supported stablecoins.
 *
 * This endpoint mimics the official Reflect API:
 *   curl https://prod.api.reflect.money/stablecoin/exchange-rates
 *
 * No query parameters or authentication required.
 *
 * Currently returns simulated data (single latest rate for USDC+).
 * In production, this would fetch the most recent oracle update from on-chain data.
 *
 * @example
 * // Simple curl request
 * curl http://localhost:3000/stablecoin/exchange-rates
 *
 * // Expected output
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "id": 105511,
 *       "stablecoin": 0,
 *       "base_usd_value_bps": 1016789908,
 *       "receipt_usd_value_bps": 1016791576,
 *       "timestamp": "2025-12-19T17:04:08.502Z"
 *     }
 *   ]
 * }
 *
 * @param _req - Express request object (unused)
 * @param res  - Express response object
 */
export async function getLatestExchangeRates(
  _req: Request,
  res: Response<ExchangeRateSuccessResponse | ExchangeRateErrorResponse>
): Promise<void> {
  // Simulated latest exchange rate — matches Rust version exactly
  const latestRates: ExchangeRateData[] = [
    {
      id: 105511,
      stablecoin: 0,
      base_usd_value_bps: 1016789908,
      receipt_usd_value_bps: 1016791576,
      timestamp: '2025-12-19T17:04:08.502Z',
    },
  ];

  res.status(200).json({
    success: true,
    data: latestRates,
  });
}

/**
 * Simulated internal server error handler (for testing error scenarios)
 */
export async function getLatestExchangeRatesError(
  _req: Request,
  res: Response<ExchangeRateErrorResponse>
): Promise<void> {
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}