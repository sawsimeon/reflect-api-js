import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/supply-caps', async (req: Request, res: Response) => {
    try {
      const caps = [
        { symbol: 'rUSD', cap: '10_000_000' },
        { symbol: 'rEUR', cap: '5_000_000' }
      ];
      res.json({ supply_caps: caps });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch supply caps' });
    }
  });
}

export default { register };
