// src/stablecoin/get_realtime_exchange_rate.ts

import { Request, Response } from 'express';

/**
 * Realtime exchange rate data for a stablecoin
 *
 * ### Fields
 * - `base`: Current USD value of the base collateral token in **basis points**
 *           (1 USD = 100_000_000 bps)
 * - `receipt`: Current USD value of the receipt (stablecoin) token in basis points
 *
 * These values typically include a small premium over $1 due to yield.
 *
 * ### Example
 * ```json
 * {
 *   "base": 1016858791,
 *   "receipt": 1016858791
 * }
 * ```
 */
export interface RealtimeExchangeRateData {
  base: number;
  receipt: number;
}

/**
 * Successful response structure
 *
 * ### Example Success Response (HTTP 200)
 * ```json
 * {
 *   "success": true,
 *   "data": {
 *     "base": 1016858791,
 *     "receipt": 1016858791
 *   }
 * }
 * ```
 */
interface RealtimeSuccessResponse {
  success: true;
  data: RealtimeExchangeRateData;
}

/**
 * Error response structure
 *
 * Used for invalid index (400) or internal errors (500).
 *
 * ### Example Error Response
 * ```json
 * {
 *   "success": false,
 *   "message": "Invalid request data: depositAmount must be positive"
 * }
 * ```
 */
interface RealtimeErrorResponse {
  success: false;
  message: string;
}

/**
 * GET /stablecoin/:index/exchange-rate
 *
 * Returns the **realtime** (current) exchange rate between the base collateral
 * and the receipt stablecoin for the specified stablecoin index.
 *
 * Path parameter:
 * - `:index` — Stablecoin index (currently only 0 is valid, for USDC+)
 *
 * This endpoint mimics the official Reflect API:
 *   curl https://prod.api.reflect.money/stablecoin/0/exchange-rate
 *
 * No query parameters or body required.
 *
 * Currently returns simulated data with a slight premium (~1.68%).
 * In production, this would fetch the latest oracle update.
 *
 * @example
 * // Get realtime rate for USDC+
 * curl http://localhost:3000/stablecoin/0/exchange-rate
 *
 * // Invalid index
 * curl http://localhost:3000/stablecoin/99/exchange-rate
 * // → 400 Bad Request
 *
 * @param req - Express request with path param `index`
 * @param res - Express response
 */
export async function getRealtimeExchangeRate(
  req: Request<{ index: string }>,
  res: Response<RealtimeSuccessResponse | RealtimeErrorResponse>
): Promise<void> {
  const index = Number(req.params.index);

  // Only stablecoin index 0 is supported (USDC+)
  if (index !== 0) {
    res.status(400).json({
      success: false,
      message: 'Invalid request data: depositAmount must be positive',
    });
    return;
  }

  // Simulated realtime exchange rate — matches Rust scaffold exactly
  const rateData: RealtimeExchangeRateData = {
    base: 1016858791,
    receipt: 1016858791,
  };

  res.status(200).json({
    success: true,
    data: rateData,
  });
}

/**
 * Simulated internal server error handler (for testing error flows)
 */
export async function getRealtimeExchangeRateError(
  _req: Request,
  res: Response<RealtimeErrorResponse>
): Promise<void> {
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}