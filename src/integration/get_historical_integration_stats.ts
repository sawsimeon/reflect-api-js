import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/historical-stats', async (req: Request, res: Response) => {
    try {
      res.json({ historical: [{ date: '2025-12-13', volume: 10000 }, { date: '2025-12-14', volume: 15000 }] });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch historical stats' });
    }
  });
}

export default { register };
