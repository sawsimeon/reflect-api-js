import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/:stablecoin/historical-rates', async (req: Request, res: Response) => {
    try {
      const { stablecoin } = req.params;
      const data = [
        { timestamp: Date.now() - 86400000 * 2, rate: 1.0 },
        { timestamp: Date.now() - 86400000, rate: 0.999 },
        { timestamp: Date.now(), rate: 1.001 }
      ];
      res.json({ stablecoin, historical: data });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch historical rates' });
    }
  });
}

export default { register };
