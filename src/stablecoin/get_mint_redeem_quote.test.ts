// src/stablecoin/get_mint_redeem_quote.test.ts

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import {
  getMintRedeemQuote,
  getMintRedeemQuoteError,
} from './get_mint_redeem_quote';

describe('POST /stablecoin/quote/:type - Mint/Redeem Quote', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());

    app.post('/stablecoin/quote/:type', getMintRedeemQuote);
    app.get('/stablecoin/quote/error', getMintRedeemQuoteError);
  });

  const validPayload = {
    stablecoinIndex: 0,
    depositAmount: 1_000_000,
  };

  const expectedQuote = 999_000; // 1_000_000 - 0.1%

  it('should return 200 with correct quote for /mint', async () => {
    const response = await request(app)
      .post('/stablecoin/quote/mint')
      .send(validPayload)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: expectedQuote,
    });
  });

  it('should return 200 with correct quote for /redeem', async () => {
    const response = await request(app)
      .post('/stablecoin/quote/redeem')
      .send(validPayload)
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: expectedQuote,
    });
  });

  it('should apply exactly 0.1% deduction (1/1000 floor)', async () => {
    const testAmounts = [
      { input: 1_000_000, expected: 999_000 },
      { input: 500_000, expected: 499_500 },
      { input: 123_456, expected: 123_332 }, // 123456 / 1000 = 123.456 → floor 123
      { input: 1, expected: 0 },
    ];

    for (const { input, expected } of testAmounts) {
      const response = await request(app)
        .post('/stablecoin/quote/mint')
        .send({ stablecoinIndex: 0, depositAmount: input })
        .expect(200);

      expect(response.body.data).toBe(expected);
    }
  });

  it('should return 400 when depositAmount is zero or negative', async () => {
    const invalidAmounts = [0, -1, -1000];

    for (const amount of invalidAmounts) {
      const response = await request(app)
        .post('/stablecoin/quote/mint')
        .send({ stablecoinIndex: 0, depositAmount: amount })
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: 'Invalid request data: depositAmount must be positive',
      });
    }
  });

  it('should return 404 for invalid quote type (not mint or redeem)', async () => {
    const invalidTypes = ['burn', 'swap', 'quote', 'MINT', ''];

    for (const type of invalidTypes) {
      const response = await request(app)
        .post(`/stablecoin/quote/${type}`)
        .send(validPayload)
        .expect(404);

      expect(response.body).toEqual({
        success: false,
        message: 'Invalid request type',
      });
    }
  });

  it('should be case-insensitive for quote type (accept "Mint", "REDEEM")', async () => {
    const variants = ['Mint', 'MINT', 'ReDeEm', 'redeem'];

    for (const variant of variants) {
      const response = await request(app)
        .post(`/stablecoin/quote/${variant}`)
        .send(validPayload)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBe(expectedQuote);
    }
  });

  it('should ignore stablecoinIndex value (not used in calculation)', async () => {
    const indices = [0, 1, 999];

    for (const index of indices) {
      const response = await request(app)
        .post('/stablecoin/quote/mint')
        .send({ stablecoinIndex: index, depositAmount: 1_000_000 })
        .expect(200);

      expect(response.body.data).toBe(expectedQuote);
    }
  });

  it('should simulate internal server error correctly', async () => {
    const response = await request(app)
      .get('/stablecoin/quote/error')
      .expect(500);

    expect(response.body).toEqual({
      success: false,
      message: 'Internal server error',
    });
  });
});