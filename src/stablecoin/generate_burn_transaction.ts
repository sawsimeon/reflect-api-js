// src/stablecoin/generate_burn_transaction.ts

import { Request, Response } from 'express';

/**
 * Request body for POST /stablecoin/burn
 *
 * Matches the Reflect API burn endpoint.
 *
 * ### Fields
 * - `stablecoin_index`: Index of the stablecoin (currently only 0 is supported)
 * - `deposit_amount`: Amount to burn in smallest units (e.g., 1000000 for 1 USDC)
 * - `signer`: User's Solana wallet public key
 * - `minimum_received`: Minimum collateral to receive (slippage protection)
 * - `collateral_mint`: Optional mint address of the collateral token
 *
 * ### Example
 * ```json
 * {
 *   "stablecoin_index": 0,
 *   "deposit_amount": 1000000,
 *   "signer": "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
 *   "minimum_received": 999000,
 *   "collateral_mint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
 * }
 * ```
 */
export interface BurnRequest {
  stablecoin_index: number;
  deposit_amount: number;
  signer: string;
  minimum_received: number;
  collateral_mint?: string;
}

/**
 * Query parameter for cluster selection
 *
 * Example: ?cluster=mainnet or ?cluster=devnet
 */
export interface ClusterQuery {
  cluster?: string;
}

/**
 * Successful response structure
 */
interface BurnSuccessResponse {
  success: true;
  data: {
    transaction: string;
  };
}

/**
 * Error response structure
 */
interface BurnErrorResponse {
  success: false;
  message: string;
}

/**
 * POST /stablecoin/burn
 *
 * Generates a burn transaction for the specified stablecoin.
 * Supports optional `cluster` query parameter (mainnet/devnet).
 *
 * Currently simulates the response — in production, this would call Reflect's backend
 * or build a real Solana transaction.
 *
 * @param req - Express request with query and JSON body
 * @param res - Express response
 */
export async function generateBurnTransaction(
  req: Request<{}, {}, BurnRequest, ClusterQuery>,
  res: Response<BurnSuccessResponse | BurnErrorResponse>
): Promise<void> {
  const { deposit_amount, stablecoin_index } = req.body;

  // Validate deposit amount
  if (deposit_amount <= 0) {
    res.status(400).json({
      success: false,
      message: 'Invalid request data: depositAmount must be positive',
    });
    return;
  }

  // Validate stablecoin index (only index 0 supported)
  if (stablecoin_index !== 0) {
    res.status(404).json({
      success: false,
      message: 'Stablecoin with the specified index not found',
    });
    return;
  }

  // Simulated transaction (base64-encoded serialized transaction)
  const simulatedTransaction =
    'AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAED...';

  res.status(200).json({
    success: true,
    data: {
      transaction: simulatedTransaction,
    },
  });
}

/**
 * Simulated internal server error handler (for testing purposes)
 */
export async function generateBurnTransactionError(
  _req: Request,
  res: Response<BurnErrorResponse>
): Promise<void> {
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}