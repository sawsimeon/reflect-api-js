import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/recent', async (req: Request, res: Response) => {
    try {
      res.json({ events: [{ id: 'evt_100', type: 'mint' }, { id: 'evt_101', type: 'burn' }] });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch recent events' });
    }
  });
}

export default { register };
