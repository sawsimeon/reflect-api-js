// src/stablecoin/generate_mint_transaction.test.ts

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import {
  generateMintTransaction,
  generateMintTransactionError,
} from './generate_mint_transaction';

describe('POST /stablecoin/mint - Generate Mint Transaction', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());

    app.post('/stablecoin/mint', generateMintTransaction);
    app.get('/stablecoin/mint/error', generateMintTransactionError);
  });

  const validPayload = {
    stablecoinIndex: 0,
    depositAmount: 1_000_000,
    signer: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
    minimumReceived: 999_000,
    collateralMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  };

  it('should return 200 with success and transaction on valid request', async () => {
    const response = await request(app)
      .post('/stablecoin/mint')
      .query({ cluster: 'mainnet' })
      .send(validPayload)
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: {
        transaction: 'AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAED...',
      },
    });
  });

  it('should return 400 when depositAmount is zero or negative', async () => {
    const response = await request(app)
      .post('/stablecoin/mint')
      .send({ ...validPayload, depositAmount: -500 })
      .expect(400);

    expect(response.body).toEqual({
      success: false,
      message: 'Invalid request data: depositAmount must be positive',
    });
  });

  it('should return 404 when stablecoinIndex is not 0', async () => {
    const response = await request(app)
      .post('/stablecoin/mint')
      .send({ ...validPayload, stablecoinIndex: 5 })
      .expect(404);

    expect(response.body).toEqual({
      success: false,
      message: 'Stablecoin with the specified index not found',
    });
  });

  it('should accept cluster query parameter without changing behavior', async () => {
    const resMainnet = await request(app)
      .post('/stablecoin/mint?cluster=mainnet')
      .send(validPayload)
      .expect(200);

    const resDevnet = await request(app)
      .post('/stablecoin/mint?cluster=devnet')
      .send(validPayload)
      .expect(200);

    const resNoCluster = await request(app)
      .post('/stablecoin/mint')
      .send(validPayload)
      .expect(200);

    expect(resMainnet.body.success).toBe(true);
    expect(resDevnet.body.success).toBe(true);
    expect(resNoCluster.body.success).toBe(true);
  });

  it('should handle internal server error simulation', async () => {
    const response = await request(app)
      .get('/stablecoin/mint/error')
      .expect(500);

    expect(response.body).toEqual({
      success: false,
      message: 'Internal server error',
    });
  });
});