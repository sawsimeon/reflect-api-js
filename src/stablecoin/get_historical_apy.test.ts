// src/stablecoin/get_historical_apy.test.ts

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import {
  getHistoricalApy,
  getHistoricalApyError,
} from './get_historical_apy';

describe('GET /stablecoin/:index/apy/historical - Historical APY', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();

    app.get('/stablecoin/:index/apy/historical', getHistoricalApy);
    app.get('/stablecoin/historical-error', getHistoricalApyError);
  });

  const expectedData = {
    index: 0,
    apy: 5.25,
    timestamp: '2023-11-07T05:31:56Z',
  };

  it('should return 200 with historical APY data for valid index and default days', async () => {
    const response = await request(app)
      .get('/stablecoin/0/apy/historical')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: expectedData,
    });
  });

  it('should accept and use custom days parameter (e.g., 30, 90, 365)', async () => {
    const daysValues = [30, 90, 365, 7, 1];

    for (const days of daysValues) {
      const response = await request(app)
        .get(`/stablecoin/0/apy/historical?days=${days}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(expectedData);
    }
  });

  it('should return 400 when days is 0 or negative', async () => {
    const invalidDays = [0, -1, -100];

    for (const days of invalidDays) {
      const response = await request(app)
        .get(`/stablecoin/0/apy/historical?days=${days}`)
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: 'Invalid request data: depositAmount must be positive',
      });
    }
  });

  it('should handle string numeric days correctly (e.g., "365")', async () => {
    const response = await request(app)
      .get('/stablecoin/0/apy/historical?days=365')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.apy).toBe(5.25);
  });

  it('should reflect the requested index in the response data', async () => {
    const testIndices = [0, 1, 5, 999];

    for (const idx of testIndices) {
      const response = await request(app)
        .get(`/stablecoin/${idx}/apy/historical`)
        .expect(200);

      expect(response.body.data.index).toBe(idx);
    }
  });

  it('should return valid ISO 8601 timestamp', async () => {
    const response = await request(app)
      .get('/stablecoin/0/apy/historical')
      .expect(200);

    const timestamp = response.body.data.timestamp;
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
    expect(timestamp).toMatch(isoRegex);

    // Verify it's a valid date
    expect(new Date(timestamp).toISOString()).toBe(timestamp.replace('Z', ''));
    expect(new Date(timestamp).toISOString() + 'Z').toBe(timestamp);
  });

  it('should return consistent data across multiple requests', async () => {
    const [res1, res2, res3] = await Promise.all([
      request(app).get('/stablecoin/0/apy/historical'),
      request(app).get('/stablecoin/0/apy/historical?days=365'),
      request(app).get('/stablecoin/0/apy/historical?days=30'),
    ]);

    const data1 = res1.body.data;
    const data2 = res2.body.data;
    const data3 = res3.body.data;

    expect(data1).toEqual(data2);
    expect(data2).toEqual(data3);
  });

  it('should simulate internal server error correctly', async () => {
    const response = await request(app)
      .get('/stablecoin/historical-error')
      .expect(500);

    expect(response.body).toEqual({
      success: false,
      message: 'Internal server error',
    });
  });
});