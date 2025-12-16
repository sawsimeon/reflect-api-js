import { Router, Request, Response } from 'express';
import { AppState } from '../index';

interface Req { tokenAddress: string; newAuthority: string }

export function register(router: Router, _state: AppState) {
  router.post('/transfer-authority', async (req: Request, res: Response) => {
    try {
      const body = req.body as Req;
      if (!body?.tokenAddress || !body?.newAuthority) return res.status(400).json({ error: 'Missing params' });
      res.json({ success: true, token: body.tokenAddress, newAuthority: body.newAuthority });
    } catch (err) {
      res.status(500).json({ error: 'Failed to transfer authority' });
    }
  });
}

export default { register };
