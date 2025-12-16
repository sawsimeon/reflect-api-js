import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/:stablecoin/realtime-rate', async (req: Request, res: Response) => {
    try {
      const { stablecoin } = req.params;
      const rate = { symbol: stablecoin, rate: 1.0 + Math.random() * 0.01, timestamp: Date.now() };
      res.json({ rate });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch realtime rate' });
    }
  });
}

export default { register };
