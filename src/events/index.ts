import { Router } from 'express';
import { AppState } from '../index';
import get_recent_events from './get_recent_events';
import get_events_by_signer from './get_events_by_signer';

export function router(state: AppState) {
  const r = Router();
  get_recent_events.register(r, state);
  get_events_by_signer.register(r, state);
  return r;
}

export default { router };
