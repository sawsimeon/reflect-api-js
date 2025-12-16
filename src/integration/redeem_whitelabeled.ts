import { Router, Request, Response } from 'express';
import { AppState } from '../index';

interface Req { tokenId: string; amount: number }

export function register(router: Router, _state: AppState) {
  router.post('/redeem-whitelabel', async (req: Request, res: Response) => {
    try {
      const body = req.body as Req;
      if (!body?.tokenId || !body?.amount) return res.status(400).json({ error: 'Missing params' });
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to redeem whitelabeled token' });
    }
  });
}

export default { register };
