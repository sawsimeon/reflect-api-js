import { Router, Request, Response } from 'express';
import { AppState } from '../index';

interface Req { integrationId: string; users: string[] }

export function register(router: Router, _state: AppState) {
  router.post('/whitelist', async (req: Request, res: Response) => {
    try {
      const body = req.body as Req;
      if (!body?.integrationId || !Array.isArray(body.users)) return res.status(400).json({ error: 'Missing params' });
      res.json({ success: true, whitelisted: body.users.length });
    } catch (err) {
      res.status(500).json({ error: 'Failed to whitelist users' });
    }
  });
}

export default { register };
