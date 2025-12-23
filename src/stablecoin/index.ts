// src/stablecoin/index.ts

import { Router } from 'express';
import { getAvailableStablecoins } from './get_available_stablecoins';
import { getSupplyCaps } from './get_supply_caps';
import { getMintRedeemQuote } from './get_mint_redeem_quote';
import { generateMintTransaction } from './generate_mint_transaction';
import { generateBurnTransaction } from './generate_burn_transaction';
import { getAllApy } from './get_all_apy';
import { getLatestExchangeRates } from './get_latest_exchange_rates';
import { getHistoricalExchangeRates } from './get_historical_exchange_rates';
import { getSpecificApy } from './get_specific_apy';
import { getHistoricalApy } from './get_historical_apy';
import { getRealtimeExchangeRate } from './get_realtime_exchange_rate';

/**
 * Creates the stablecoin router with all endpoints under /stablecoin
 *
 * Example routes:
 *   GET    /stablecoin/stablecoins
 *   GET    /stablecoin/supply-caps
 *   POST   /stablecoin/quote
 *   POST   /stablecoin/mint
 *   POST   /stablecoin/burn
 *   GET    /stablecoin/apy
 *   ...
 *
 * Note: No AppState is currently used. If you need shared state later (e.g., config, cache),
 * you can add it as a parameter and close over it in handlers.
 *
 * @returns Configured Express Router
 */
export function createStablecoinRouter(): Router {
  const router = Router();

  // GET /stablecoin/stablecoins - List all available stablecoins
  router.get('/stablecoins', getAvailableStablecoins);

  // GET /stablecoin/supply-caps - Get supply caps for stablecoins
  router.get('/supply-caps', getSupplyCaps);

  // POST /stablecoin/quote - Get mint/redeem quote
  router.post('/quote', getMintRedeemQuote);

  // POST /stablecoin/mint - Generate mint transaction
  router.post('/mint', generateMintTransaction);

  // POST /stablecoin/burn - Generate burn transaction
  router.post('/burn', generateBurnTransaction);

  // GET /stablecoin/apy - Get APY for all stablecoins
  router.get('/apy', getAllApy);

  // GET /stablecoin/exchange-rates/latest - Latest exchange rates
  router.get('/exchange-rates/latest', getLatestExchangeRates);

  // GET /stablecoin/exchange-rates/historical - Historical rates
  router.get('/exchange-rates/historical', getHistoricalExchangeRates);

  // GET /stablecoin/apy/:index - Specific stablecoin APY
  router.get('/apy/:index', getSpecificApy);

  // GET /stablecoin/apy/historical - Historical APY data
  router.get('/apy/historical', getHistoricalApy);

  // GET /stablecoin/exchange-rate/realtime - Realtime rate for a pair
  router.get('/exchange-rate/realtime', getRealtimeExchangeRate);

  return router;
}

// Default export for convenience (e.g., import stablecoinRouter from './stablecoin')
export default createStablecoinRouter;