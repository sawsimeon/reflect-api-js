import { Router } from 'express';
import { AppState } from '../index';
import get_available_stablecoins from './get_available_stablecoins';
import get_supply_caps from './get_supply_caps';
import get_mint_redeem_quote from './get_mint_redeem_quote';
import generate_mint_transaction from './generate_mint_transaction';
import generate_burn_transaction from './generate_burn_transaction';
import get_all_apy from './get_all_apy';
import get_latest_exchange_rates from './get_latest_exchange_rates';
import get_historical_exchange_rates from './get_historical_exchange_rates';
import get_specific_apy from './get_specific_apy';
import get_historical_apy from './get_historical_apy';
import get_realtime_exchange_rate from './get_realtime_exchange_rate';

export function router(state: AppState) {
  const r = Router();
  get_available_stablecoins.register(r, state);
  get_supply_caps.register(r, state);
  get_mint_redeem_quote.register(r, state);
  generate_mint_transaction.register(r, state);
  generate_burn_transaction.register(r, state);
  get_all_apy.register(r, state);
  get_latest_exchange_rates.register(r, state);
  get_historical_exchange_rates.register(r, state);
  get_specific_apy.register(r, state);
  get_historical_apy.register(r, state);
  get_realtime_exchange_rate.register(r, state);
  return r;
}

export default { router };
