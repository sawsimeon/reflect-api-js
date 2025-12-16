import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/historical', async (req: Request, res: Response) => {
    try {
      res.json({ historical: [{ date: '2025-12-13', tvl: 1000000, volume: 20000 }, { date: '2025-12-14', tvl: 1100000, volume: 25000 }] });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch historical data' });
    }
  });
}

export default { register };
