import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/', async (req: Request, res: Response) => {
    try {
      const coins = [
        { symbol: 'rUSD', name: 'Reflect USD', supply: '1_000_000' },
        { symbol: 'rEUR', name: 'Reflect EUR', supply: '500_000' }
      ];
      res.json({ stablecoins: coins });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch stablecoins' });
    }
  });
}

export default { register };
