import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/stats', async (req: Request, res: Response) => {
    try {
      res.json({ integrations: 12, total_volume: '1000000' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch integration stats' });
    }
  });
}

export default { register };
