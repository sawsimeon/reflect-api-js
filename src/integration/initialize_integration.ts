import { Router, Request, Response } from 'express';
import { AppState } from '../index';

interface InitReq { name: string; owner: string }

export function register(router: Router, _state: AppState) {
  router.post('/init', async (req: Request, res: Response) => {
    try {
      const body = req.body as InitReq;
      if (!body?.name || !body?.owner) return res.status(400).json({ error: 'Missing name or owner' });
      res.json({ integration_id: 'int_123', name: body.name, owner: body.owner });
    } catch (err) {
      res.status(500).json({ error: 'Failed to initialize integration' });
    }
  });
}

export default { register };
