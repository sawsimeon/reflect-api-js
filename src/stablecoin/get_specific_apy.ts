import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/:stablecoin/apy', async (req: Request, res: Response) => {
    try {
      const { stablecoin } = req.params;
      const apy = { symbol: stablecoin, apy: 0.02 };
      res.json({ apy });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch specific APY' });
    }
  });
}

export default { register };
