// src/stablecoin/get_mint_redeem_quote.ts

import { Request, Response } from 'express';

/**
 * Request body for POST /stablecoin/quote/mint or /stablecoin/quote/redeem
 *
 * ### Fields
 * - `stablecoinIndex`: Index of the stablecoin (e.g., 0 = USDC+)
 * - `depositAmount`: Amount in smallest units (e.g., 1000000 = 1.00 token with 6 decimals)
 *
 * Must be positive.
 *
 * ### Example Request Body
 * ```json
 * {
 *   "stablecoinIndex": 0,
 *   "depositAmount": 1000000
 * }
 * ```
 */
export interface QuoteRequest {
  stablecoinIndex: number;
  depositAmount: number;
}

/**
 * Successful response structure
 *
 * Returns the quoted output amount after fees.
 *
 * ### Example Success Response (HTTP 200)
 * ```json
 * {
 *   "success": true,
 *   "data": 999000
 * }
 * ```
 */
interface QuoteSuccessResponse {
  success: true;
  data: number;
}

/**
 * Error response structure
 *
 * Used for validation errors (400), invalid type (404), or internal errors (500).
 *
 * ### Example Error Responses
 * ```json
 * { "success": false, "message": "Invalid request data: depositAmount must be positive" }
 * { "success": false, "message": "Invalid request type" }
 * { "success": false, "message": "Internal server error" }
 * ```
 */
interface QuoteErrorResponse {
  success: false;
  message: string;
}

/**
 * POST /stablecoin/quote/:type
 *
 * Calculates a mint or redeem quote for a given stablecoin and deposit amount.
 *
 * Path parameter:
 * - `:type` — Must be either `"mint"` or `"redeem"`
 *
 * Body:
 * - JSON with `stablecoinIndex` and `depositAmount`
 *
 * This endpoint mimics the official Reflect API quote behavior.
 * Currently applies a simulated **0.1% fee** (1/1000 deduction).
 *
 * @example
 * // Mint quote: deposit 1 USDC → receive ~0.999 USDC+
 * curl -X POST http://localhost:3000/stablecoin/quote/mint \
 *   -H "Content-Type: application/json" \
 *   -d '{"stablecoinIndex": 0, "depositAmount": 1000000}'
 *
 * // Redeem quote: burn 1 USDC+ → receive ~0.999 USDC
 * curl -X POST http://localhost:3000/stablecoin/quote/redeem \
 *   -d '{"stablecoinIndex": 0, "depositAmount": 1000000}'
 *
 * @param req - Express request with path param `:type` and JSON body
 * @param res - Express response
 */
export async function getMintRedeemQuote(
  req: Request<{ type: string }, {}, QuoteRequest>,
  res: Response<QuoteSuccessResponse | QuoteErrorResponse>
): Promise<void> {
  const quoteType = req.params.type.toLowerCase();
  const { depositAmount } = req.body;

  // Validate depositAmount > 0
  if (depositAmount <= 0) {
    res.status(400).json({
      success: false,
      message: 'Invalid request data: depositAmount must be positive',
    });
    return;
  }

  // Validate quote type
  if (quoteType !== 'mint' && quoteType !== 'redeem') {
    res.status(404).json({
      success: false,
      message: 'Invalid request type',
    });
    return;
  }

  // Simulated quote: apply 0.1% fee (subtract 1/1000 of amount)
  // e.g., 1_000_000 → 999_000
  const quotedAmount = depositAmount - Math.floor(depositAmount / 1000);

  res.status(200).json({
    success: true,
    data: quotedAmount,
  });
}

/**
 * Simulated internal server error handler (for testing)
 */
export async function getMintRedeemQuoteError(
  _req: Request,
  res: Response<QuoteErrorResponse>
): Promise<void> {
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}