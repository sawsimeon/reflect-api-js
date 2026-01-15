// src/stablecoin/get_realtime_exchange_rate.test.ts

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import {
  getRealtimeExchangeRate,
  getRealtimeExchangeRateError,
} from './get_realtime_exchange_rate';

describe('GET /stablecoin/:index/exchange-rate - Realtime Exchange Rate', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();

    app.get('/stablecoin/:index/exchange-rate', getRealtimeExchangeRate);
    app.get('/stablecoin/exchange-rate/error', getRealtimeExchangeRateError);
  });

  const expectedRate = {
    base: 1016858791,
    receipt: 1016858791,
  };

  it('should return 200 with realtime rate for valid index 0', async () => {
    const response = await request(app)
      .get('/stablecoin/0/exchange-rate')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: expectedRate,
    });
  });

  it('should return exact simulated values from scaffold', async () => {
    const response = await request(app).get('/stablecoin/0/exchange-rate').expect(200);

    const { data } = response.body;
    expect(data.base).toBe(1016858791);
    expect(data.receipt).toBe(1016858791);
  });

  it('should return 400 for any index other than 0', async () => {
    const invalidIndices = [1, 5, 99, 1000, -1];

    for (const idx of invalidIndices) {
      const response = await request(app)
        .get(`/stablecoin/${idx}/exchange-rate`)
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: 'Invalid request data: depositAmount must be positive',
      });
    }
  });

  it('should accept string numeric index and convert correctly', async () => {
    // Express converts path params to strings, but we parse with Number()
    const response = await request(app)
      .get('/stablecoin/0/exchange-rate')
      .expect(200);

    expect(response.body.success).toBe(true);
  });

  it('should return values indicating a premium over $1 (in basis points)', async () => {
    const response = await request(app).get('/stablecoin/0/exchange-rate').expect(200);

    const { base, receipt } = response.body.data;

    // 1 USD = 100_000_000 bps → anything above indicates premium
    expect(base).toBeGreaterThan(100_000_000);
    expect(receipt).toBeGreaterThan(100_000_000);

    // In this simulation, base and receipt are equal
    expect(base).toBe(receipt);
  });

  it('should return consistent data across multiple requests', async () => {
    const [res1, res2] = await Promise.all([
      request(app).get('/stablecoin/0/exchange-rate'),
      request(app).get('/stablecoin/0/exchange-rate'),
    ]);

    expect(res1.body).toEqual(res2.body);
  });

  it('should simulate internal server error correctly', async () => {
    const response = await request(app)
      .get('/stablecoin/exchange-rate/error')
      .expect(500);

    expect(response.body).toEqual({
      success: false,
      message: 'Internal server error',
    });
  });

  it('should always return success: true and data object on valid request', async () => {
    const response = await request(app).get('/stablecoin/0/exchange-rate').expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Object);
    expect(response.body.data).toHaveProperty('base');
    expect(response.body.data).toHaveProperty('receipt');
  });
});