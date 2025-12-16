import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/apy', async (req: Request, res: Response) => {
    try {
      const apy = [
        { symbol: 'rUSD', apy: 0.02 },
        { symbol: 'rEUR', apy: 0.015 }
      ];
      res.json({ apy });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch APY' });
    }
  });
}

export default { register };
