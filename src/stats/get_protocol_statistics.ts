import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/protocol', async (req: Request, res: Response) => {
    try {
      res.json({ tvl: '2000000', total_minted: '1500000' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch protocol stats' });
    }
  });
}

export default { register };
