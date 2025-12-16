import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/exchange-rates', async (req: Request, res: Response) => {
    try {
      const rates = { rUSD: 1.0, rEUR: 1.1 };
      res.json({ rates, timestamp: Date.now() });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch exchange rates' });
    }
  });
}

export default { register };
