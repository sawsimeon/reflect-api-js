import { Router, Request, Response } from 'express';
import { AppState } from '../index';

interface BurnTxRequest {
  stablecoin: string;
  amount: number;
  source: string;
}

export function register(router: Router, _state: AppState) {
  router.post('/burn/tx', async (req: Request, res: Response) => {
    try {
      const body = req.body as BurnTxRequest;
      if (!body || !body.stablecoin || !body.amount || !body.source) {
        return res.status(400).json({ error: 'Missing parameters' });
      }
      const tx = { tx: 'burn_tx_blob', stablecoin: body.stablecoin, amount: body.amount };
      res.json({ transaction: tx });
    } catch (err) {
      res.status(500).json({ error: 'Failed to generate burn transaction' });
    }
  });
}

export default { register };
