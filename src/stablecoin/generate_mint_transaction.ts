// src/stablecoin/generate_mint_transaction.ts

import { Request, Response } from 'express';

/**
 * Request body for POST /stablecoin/mint
 *
 * Matches the official Reflect API mint endpoint.
 *
 * ### Fields
 * - `stablecoinIndex`: Index of the stablecoin (currently only 0 is supported, e.g., USDC+)
 * - `depositAmount`: Amount of collateral to deposit (in smallest units, e.g., 1000000 = 1 USDC)
 * - `signer`: User's Solana wallet public key (base58)
 * - `minimumReceived`: Minimum stablecoin amount to receive (slippage protection)
 * - `collateralMint`: Optional mint address of the collateral token (e.g., USDC)
 *
 * ### Example Request Body
 * ```json
 * {
 *   "stablecoinIndex": 0,
 *   "depositAmount": 1000000,
 *   "signer": "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
 *   "minimumReceived": 999000,
 *   "collateralMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
 * }
 * ```
 */
export interface MintRequest {
  stablecoinIndex: number;
  depositAmount: number;
  signer: string;
  minimumReceived: number;
  collateralMint?: string;
}

/**
 * Query parameter for cluster selection
 *
 * Example:
 *   ?cluster=mainnet
 *   ?cluster=devnet
 */
export interface ClusterQuery {
  cluster?: string;
}

/**
 * Successful response structure
 *
 * ### Example Success Response (HTTP 200)
 * ```json
 * {
 *   "success": true,
 *   "data": {
 *     "transaction": "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAED..."
 *   }
 * }
 * ```
 */
interface MintSuccessResponse {
  success: true;
  data: {
    transaction: string;
  };
}

/**
 * Error response structure
 *
 * Used for 400, 404, and 500 errors.
 *
 * ### Example Error Response
 * ```json
 * {
 *   "success": false,
 *   "message": "Invalid request data: depositAmount must be positive"
 * }
 * ```
 */
interface MintErrorResponse {
  success: false;
  message: string;
}

/**
 * POST /stablecoin/mint
 *
 * Generates a mint transaction: user deposits collateral and receives stablecoins.
 *
 * Supports optional `?cluster=mainnet|devnet` query parameter.
 *
 * Currently returns a simulated transaction. In production, this would:
 * - Query on-chain state
 * - Build a real Solana transaction using @solana/web3.js or Reflect's SDK
 *
 * @param req - Express request (with query and JSON body)
 * @param res - Express response
 *
 * @example
 * curl -X POST http://localhost:3000/stablecoin/mint?cluster=mainnet \
 *   -H "Content-Type: application/json" \
 *   -d '{"stablecoinIndex":0,"depositAmount":1000000,"signer":"9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM","minimumReceived":999000}'
 */
export async function generateMintTransaction(
  req: Request<{}, {}, MintRequest, ClusterQuery>,
  res: Response<MintSuccessResponse | MintErrorResponse>
): Promise<void> {
  const { depositAmount, stablecoinIndex } = req.body;

  // Validate deposit amount must be positive
  if (depositAmount <= 0) {
    res.status(400).json({
      success: false,
      message: 'Invalid request data: depositAmount must be positive',
    });
    return;
  }

  // Only stablecoin index 0 is currently supported
  if (stablecoinIndex !== 0) {
    res.status(404).json({
      success: false,
      message: 'Stablecoin with the specified index not found',
    });
    return;
  }

  // Simulated base64-encoded transaction (same as Rust version)
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
 * Simulated internal server error handler (useful for testing error flows)
 */
export async function generateMintTransactionError(
  _req: Request,
  res: Response<MintErrorResponse>
): Promise<void> {
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}