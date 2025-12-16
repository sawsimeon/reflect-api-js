import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/events', async (req: Request, res: Response) => {
    try {
      res.json({ events: [{ id: 'evt_1' }, { id: 'evt_2' }] });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });
}

export default { register };
