import { Router, Request, Response } from 'express';
import { AppState } from '../index';

interface MintTxRequest {
  stablecoin: string;
  amount: number;
  destination: string;
}

export function register(router: Router, _state: AppState) {
  router.post('/mint/tx', async (req: Request, res: Response) => {
    try {
      const body = req.body as MintTxRequest;
      if (!body || !body.stablecoin || !body.amount || !body.destination) {
        return res.status(400).json({ error: 'Missing parameters' });
      }
      // Placeholder transaction blob
      const tx = { tx: 'mint_tx_blob', stablecoin: body.stablecoin, amount: body.amount };
      res.json({ transaction: tx });
    } catch (err) {
      res.status(500).json({ error: 'Failed to generate mint transaction' });
    }
  });
}

export default { register };
