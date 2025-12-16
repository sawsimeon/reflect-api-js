import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/exchange-rate', async (req: Request, res: Response) => {
    try {
      res.json({ rate: 1.0, symbol: 'rUSD', timestamp: Date.now() });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch exchange rate' });
    }
  });
}

export default { register };
