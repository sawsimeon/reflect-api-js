import { Router } from 'express';
import { AppState } from '../index';
import get_protocol_statistics from './get_protocol_statistics';
import get_historical_tvl_and_volume from './get_historical_tvl_and_volume';

export function router(state: AppState) {
  const r = Router();
  get_protocol_statistics.register(r, state);
  get_historical_tvl_and_volume.register(r, state);
  return r;
}

export default { router };
