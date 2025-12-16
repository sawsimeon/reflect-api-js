import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/by-signer', async (req: Request, res: Response) => {
    try {
      const signer = req.query.signer || 'unknown';
      res.json({ signer, events: [{ id: 'evt_200' }, { id: 'evt_201' }] });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch events by signer' });
    }
  });
}

export default { register };
