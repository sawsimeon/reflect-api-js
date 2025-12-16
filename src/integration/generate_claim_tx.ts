import { Router, Request, Response } from 'express';
import { AppState } from '../index';

interface Req { claimant: string; amount: number }

export function register(router: Router, _state: AppState) {
  router.post('/claim/tx', async (req: Request, res: Response) => {
    try {
      const body = req.body as Req;
      if (!body?.claimant || !body?.amount) return res.status(400).json({ error: 'Missing params' });
      res.json({ tx: 'claim_tx_blob' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to generate claim tx' });
    }
  });
}

export default { register };
