import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/config', async (req: Request, res: Response) => {
    try {
      res.json({ config: { mode: 'sandbox', fees: { mint: 100, redeem: 100 } } });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch config' });
    }
  });
}

export default { register };
