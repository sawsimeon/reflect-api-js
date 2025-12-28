// src/stablecoin/get_historical_exchange_rates.test.ts

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import {
  getHistoricalExchangeRates,
  getHistoricalExchangeRatesError,
} from './get_historical_exchange_rates';

describe('GET /stablecoin/exchange-rates/historical - Historical Exchange Rates', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();

    app.get('/stablecoin/exchange-rates/historical', getHistoricalExchangeRates);
    app.get('/stablecoin/exchange-rates/historical/error', getHistoricalExchangeRatesError);
  });

  const expectedData = [
    {
      id: 104135,
      stablecoin: 0,
      base_usd_value_bps: 1016733625,
      receipt_usd_value_bps: 1016733625,
      timestamp: '2025-12-18T17:46:10.274Z',
    },
    {
      id: 104137,
      stablecoin: 0,
      base_usd_value_bps: 1016728666,
      receipt_usd_value_bps: 1016728667,
      timestamp: '2025-12-18T17:47:08.161Z',
    },
  ];

  it('should return 200 with array of historical exchange rate data', async () => {
    const response = await request(app)
      .get('/stablecoin/exchange-rates/historical')
      .query({ stablecoin: 0, days: 7 })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: expectedData.map(item => ({ ...item, stablecoin: 0 })),
    });
  });

  it('should reflect the requested stablecoin index in all data points', async () => {
    const testIndices = [0, 1, 5];

    for (const idx of testIndices) {
      const response = await request(app)
        .get('/stablecoin/exchange-rates/historical')
        .query({ stablecoin: idx, days: 30 })
        .expect(200);

      response.body.data.forEach((point: any) => {
        expect(point.stablecoin).toBe(idx);
      });
    }
  });

  it('should accept different days values without changing data (simulated)', async () => {
    const daysValues = [1, 7, 30, 90, 365];

    for (const days of daysValues) {
      const response = await request(app)
        .get('/stablecoin/exchange-rates/historical')
        .query({ stablecoin: 0, days })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(2);
    }
  });

  it('should return consistent data structure across requests', async () => {
    const responses = await Promise.all([
      request(app).get('/stablecoin/exchange-rates/historical').query({ stablecoin: 0, days: 1 }),
      request(app).get('/stablecoin/exchange-rates/historical').query({ stablecoin: 0, days: 30 }),
    ]);

    const data1 = responses[0].body.data;
    const data2 = responses[1].body.data;

    // Only stablecoin might differ if changed, but here it's same
    expect(data1.map((d: any) => ({ ...d, stablecoin: 0 }))).toEqual(
      data2.map((d: any) => ({ ...d, stablecoin: 0 }))
    );
  });

  it('should return valid ISO 8601 timestamps', async () => {
    const response = await request(app)
      .get('/stablecoin/exchange-rates/historical')
      .query({ stablecoin: 0, days: 1 })
      .expect(200);

    response.body.data.forEach((point: any) => {
      const timestamp = point.timestamp;
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
      expect(timestamp).toMatch(isoRegex);

      // Verify round-trip validity
      const date = new Date(timestamp);
      expect(date.toISOString()).toBe(timestamp);
    });
  });

  it('should return basis point values greater than 100_000_000 (≈ $1.00)', async () => {
    const response = await request(app)
      .get('/stablecoin/exchange-rates/historical')
      .query({ stablecoin: 0, days: 1 })
      .expect(200);

    response.body.data.forEach((point: any) => {
      expect(point.base_usd_value_bps).toBeGreaterThan(100_000_000);
      expect(point.receipt_usd_value_bps).toBeGreaterThan(100_000_000);
    });
  });

  it('should simulate internal server error correctly', async () => {
    const response = await request(app)
      .get('/stablecoin/exchange-rates/historical/error')
      .expect(500);

    expect(response.body).toEqual({
      success: false,
      message: 'Internal server error',
    });
  });

  it('should always return non-empty data array on success', async () => {
    const response = await request(app)
      .get('/stablecoin/exchange-rates/historical')
      .query({ stablecoin: 0, days: 1 })
      .expect(200);

    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});