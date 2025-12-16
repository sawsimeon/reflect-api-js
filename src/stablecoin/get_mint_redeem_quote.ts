import { Router, Request, Response } from 'express';
import { AppState } from '../index';

interface QuoteRequest {
  stablecoin: string;
  amount: number; // in minor units
  side: 'mint' | 'redeem';
}

export function register(router: Router, _state: AppState) {
  router.post('/quote', async (req: Request, res: Response) => {
    try {
      const body = req.body as QuoteRequest;
      if (!body || !body.stablecoin || !body.amount || !body.side) {
        return res.status(400).json({ error: 'Missing parameters' });
      }
      // Placeholder quote
      const quote = {
        stablecoin: body.stablecoin,
        amount: body.amount,
        side: body.side,
        fee: 100,
        estimated: body.amount - 100
      };
      res.json({ quote });
    } catch (err) {
      res.status(500).json({ error: 'Failed to generate quote' });
    }
  });
}

export default { register };
