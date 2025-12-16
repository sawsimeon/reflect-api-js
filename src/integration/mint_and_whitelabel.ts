import { Router, Request, Response } from 'express';
import { AppState } from '../index';

interface Req { integrationId: string; metadata?: any }

export function register(router: Router, _state: AppState) {
  router.post('/mint-whitelabel', async (req: Request, res: Response) => {
    try {
      const body = req.body as Req;
      if (!body?.integrationId) return res.status(400).json({ error: 'Missing integrationId' });
      res.json({ success: true, minted_token: 'wt_0xabc' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to mint and whitelabel' });
    }
  });
}

export default { register };
