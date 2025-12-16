import { Router, Request, Response } from 'express';
import { AppState } from '../index';

interface MetaReq { integrationId: string; metadata: Record<string, any> }

export function register(router: Router, _state: AppState) {
  router.post('/metadata/upload', async (req: Request, res: Response) => {
    try {
      const body = req.body as MetaReq;
      if (!body?.integrationId || !body?.metadata) return res.status(400).json({ error: 'Missing params' });
      res.json({ success: true, uploaded: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to upload metadata' });
    }
  });
}

export default { register };
