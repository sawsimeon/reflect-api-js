import { Router, Request, Response } from 'express';
import { AppState } from '../index';

interface Req { integrationId: string; amount: number }

export function register(router: Router, _state: AppState) {
  router.post('/mint/tx', async (req: Request, res: Response) => {
    try {
      const body = req.body as Req;
      if (!body?.integrationId || !body?.amount) return res.status(400).json({ error: 'Missing params' });
      res.json({ transaction: 'mint_tx_blob_for_integration' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to generate mint tx' });
    }
  });
}

export default { register };
