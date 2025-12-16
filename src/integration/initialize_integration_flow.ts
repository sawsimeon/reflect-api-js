import { Router, Request, Response } from 'express';
import { AppState } from '../index';

interface Req { integrationId: string; flowType: string }

export function register(router: Router, _state: AppState) {
  router.post('/flow/init', async (req: Request, res: Response) => {
    try {
      const body = req.body as Req;
      if (!body?.integrationId || !body?.flowType) return res.status(400).json({ error: 'Missing params' });
      res.json({ flow_id: 'flow_1', integration: body.integrationId, flowType: body.flowType });
    } catch (err) {
      res.status(500).json({ error: 'Failed to initialize integration flow' });
    }
  });
}

export default { register };
