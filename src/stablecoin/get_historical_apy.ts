import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/:stablecoin/historical-apy', async (req: Request, res: Response) => {
    try {
      const { stablecoin } = req.params;
      const history = [
        { date: '2025-12-13', apy: 0.018 },
        { date: '2025-12-14', apy: 0.019 },
        { date: '2025-12-15', apy: 0.02 }
      ];
      res.json({ stablecoin, history });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch historical APY' });
    }
  });
}

export default { register };
