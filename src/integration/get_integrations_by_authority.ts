import { Router, Request, Response } from 'express';
import { AppState } from '../index';

export function register(router: Router, _state: AppState) {
  router.get('/by-authority', async (req: Request, res: Response) => {
    try {
      const authority = req.query.authority || 'unknown';
      res.json({ authority, integrations: [{ id: 'int_123' }, { id: 'int_456' }] });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch integrations by authority' });
    }
  });
}

export default { register };
