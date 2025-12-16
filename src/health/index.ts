import { Router } from 'express';
import { AppState } from '../index';
import health_check from './health_check';

export function router(state: AppState): Router {
  const r = Router();
  health_check.register(r, state);
  return r;
}

export default { router };
