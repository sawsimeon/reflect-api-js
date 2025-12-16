import { Router, Request, Response } from 'express';
import { AppState } from '../index';

interface Req { integrationId: string }

export function register(router: Router, _state: AppState) {
  router.post('/api-key/rotate', async (req: Request, res: Response) => {
    try {
      const body = req.body as Req;
      if (!body?.integrationId) return res.status(400).json({ error: 'Missing integrationId' });
      res.json({ success: true, newApiKeyId: 'key_789' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to rotate api key' });
    }
  });
}

export default { register };
