import { Router, Request, Response } from 'express';
import { AppState } from '../index';

interface Req { userId: string; symbol: string }

export function register(router: Router, _state: AppState) {
  router.post('/user-token/init', async (req: Request, res: Response) => {
    try {
      const body = req.body as Req;
      if (!body?.userId || !body?.symbol) return res.status(400).json({ error: 'Missing params' });
      res.json({ token: 'user_token_0x123', symbol: body.symbol });
    } catch (err) {
      res.status(500).json({ error: 'Failed to initialize user token' });
    }
  });
}

export default { register };
