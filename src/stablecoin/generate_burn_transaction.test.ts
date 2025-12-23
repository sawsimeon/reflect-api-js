// src/stablecoin/generate_burn_transaction.test.ts

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import {
  generateBurnTransaction,
  generateBurnTransactionError,
} from './generate_burn_transaction';

describe('POST /stablecoin/burn - Generate Burn Transaction', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());

    // Mount the handler
    app.post('/stablecoin/burn', generateBurnTransaction);
    app.get('/stablecoin/burn/error', generateBurnTransactionError);
  });

  const validPayload = {
    stablecoin_index: 0,
    deposit_amount: 1_000_000,
    signer: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
    minimum_received: 999_000,
    collateral_mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  };

  it('should return 200 with success and transaction when valid request', async () => {
    const response = await request(app)
      .post('/stablecoin/burn')
      .query({ cluster: 'mainnet' })
      .send(validPayload)
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: {
        transaction: expect.any(String),
      },
    });

    expect(response.body.data.transaction).toBe(
      'AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAED...'
    );
  });

  it('should return 400 when deposit_amount is negative or zero', async () => {
    const response = await request(app)
      .post('/stablecoin/burn')
      .send({ ...validPayload, deposit_amount: -100 })
      .expect(400);

    expect(response.body).toEqual({
      success: false,
      message: 'Invalid request data: depositAmount must be positive',
    });
  });

  it('should return 404 when stablecoin_index is not 0', async () => {
    const response = await request(app)
      .post('/stablecoin/burn')
      .send({ ...validPayload, stablecoin_index: 99 })
      .expect(404);

    expect(response.body).toEqual({
      success: false,
      message: 'Stablecoin with the specified index not found',
    });
  });

  it('should handle internal server error simulation', async () => {
    const response = await request(app)
      .get('/stablecoin/burn/error')
      .expect(500);

    expect(response.body).toEqual({
      success: false,
      message: 'Internal server error',
    });
  });

  it('should accept cluster query parameter without affecting response', async () => {
    const resMainnet = await request(app)
      .post('/stablecoin/burn')
      .query({ cluster: 'mainnet' })
      .send(validPayload)
      .expect(200);

    const resDevnet = await request(app)
      .post('/stablecoin/burn')
      .query({ cluster: 'devnet' })
      .send(validPayload)
      .expect(200);

    const resNoCluster = await request(app)
      .post('/stablecoin/burn')
      .send(validPayload)
      .expect(200);

    expect(resMainnet.body.success).toBe(true);
    expect(resDevnet.body.success).toBe(true);
    expect(resNoCluster.body.success).toBe(true);
  });
});