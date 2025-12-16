import { Router, Request, Response } from 'express';
import { AppState } from '../index';

interface Req { integrationId: string; symbol: string }

export function register(router: Router, _state: AppState) {
  router.post('/token/init', async (req: Request, res: Response) => {
    try {
      const body = req.body as Req;
      if (!body?.integrationId || !body?.symbol) return res.status(400).json({ error: 'Missing params' });
      res.json({ token_address: 'token_0xabc', symbol: body.symbol });
    } catch (err) {
      res.status(500).json({ error: 'Failed to initialize token' });
    }
  });
}

export default { register };
