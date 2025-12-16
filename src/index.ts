import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import healthModule from './health';
import stablecoinModule from './stablecoin';
import integrationModule from './integration';
import statsModule from './stats';
import eventsModule from './events';

dotenv.config();

export interface AppState {
  // Add DB pools, caches, etc. later
}

const state: AppState = {};

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// Mount modules
app.use('/health', healthModule.router(state));
app.use('/stablecoins', stablecoinModule.router(state));
app.use('/integrations', integrationModule.router(state));
app.use('/stats', statsModule.router(state));
app.use('/events', eventsModule.router(state));

// Root
app.get('/', async (req: Request, res: Response) => {
  try {
    res.json({ service: 'reflect-api-js', status: 'running' });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(+PORT, '0.0.0.0', () => {
  console.log(`Server listening on 0.0.0.0:${PORT}`);
});
