// src/stablecoin/get_latest_exchange_rates.test.ts

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import {
  getLatestExchangeRates,
  getLatestExchangeRatesError,
} from './get_latest_exchange_rates';

describe('GET /stablecoin/exchange-rates - Latest Exchange Rates', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();

    app.get('/stablecoin/exchange-rates', getLatestExchangeRates);
    app.get('/stablecoin/exchange-rates/error', getLatestExchangeRatesError);
  });

  const expectedRate = {
    id: 105511,
    stablecoin: 0,
    base_usd_value_bps: 1016789908,
    receipt_usd_value_bps: 1016791576,
    timestamp: '2025-12-19T17:04:08.502Z',
  };

  it('should return 200 with latest exchange rate data', async () => {
    const response = await request(app)
      .get('/stablecoin/exchange-rates')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: [expectedRate],
    });
  });

  it('should return an array with exactly one rate (latest snapshot)', async () => {
    const response = await request(app).get('/stablecoin/exchange-rates').expect(200);

    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data).toHaveLength(1);

    const rate = response.body.data[0];
    expect(rate).toMatchObject({
      id: expect.any(Number),
      stablecoin: 0,
      base_usd_value_bps: expect.any(Number),
      receipt_usd_value_bps: expect.any(Number),
      timestamp: expect.any(String),
    });
  });

  it('should include correct values from simulated data', async () => {
    const response = await request(app).get('/stablecoin/exchange-rates').expect(200);

    const rate = response.body.data[0];
    expect(rate.id).toBe(105511);
    expect(rate.stablecoin).toBe(0);
    expect(rate.base_usd_value_bps).toBe(1016789908);
    expect(rate.receipt_usd_value_bps).toBe(1016791576);
  });

  it('should return valid ISO 8601 timestamp with milliseconds and Z', async () => {
    const response = await request(app).get('/stablecoin/exchange-rates').expect(200);

    const timestamp = response.body.data[0].timestamp;
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    expect(timestamp).toMatch(isoRegex);

    // Verify it's a valid date that round-trips correctly
    const date = new Date(timestamp);
    expect(date.toISOString()).toBe(timestamp);
  });

  it('should return basis point values slightly above $1 (premium expected)', async () => {
    const response = await request(app).get('/stablecoin/exchange-rates').expect(200);

    const rate = response.body.data[0];
    expect(rate.base_usd_value_bps).toBeGreaterThan(100_000_000);
    expect(rate.receipt_usd_value_bps).toBeGreaterThan(100_000_000);
  });

  it('should return consistent data on multiple consecutive requests', async () => {
    const [res1, res2] = await Promise.all([
      request(app).get('/stablecoin/exchange-rates'),
      request(app).get('/stablecoin/exchange-rates'),
    ]);

    expect(res1.body).toEqual(res2.body);
  });

  it('should simulate internal server error correctly', async () => {
    const response = await request(app)
      .get('/stablecoin/exchange-rates/error')
      .expect(500);

    expect(response.body).toEqual({
      success: false,
      message: 'Internal server error',
    });
  });

  it('should always return success: true and non-empty data array on success', async () => {
    const response = await request(app).get('/stablecoin/exchange-rates').expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});