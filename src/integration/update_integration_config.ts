import { Router, Request, Response } from 'express';
import { AppState } from '../index';

interface UpdateReq { key: string; value: any }

export function register(router: Router, _state: AppState) {
  router.post('/config/update', async (req: Request, res: Response) => {
    try {
      const body = req.body as UpdateReq;
      if (!body?.key) return res.status(400).json({ error: 'Missing key' });
      res.json({ success: true, updated: { [body.key]: body.value } });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update config' });
    }
  });
}

export default { register };
