// src/stablecoin/get_available_stablecoins.test.ts

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import {
  getAvailableStablecoins,
  getAvailableStablecoinsError,
} from './get_available_stablecoins';

describe('GET /stablecoin/types - Get Available Stablecoins', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();

    // Mount routes for testing
    app.get('/stablecoin/types', getAvailableStablecoins);
    app.get('/stablecoin/types/error', getAvailableStablecoinsError);
  });

  it('should return 200 with success and list of stablecoins', async () => {
    const response = await request(app)
      .get('/stablecoin/types')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: [
        {
          index: 0,
          name: 'USDC+',
        },
      ],
    });
  });

  it('should return an array containing exactly one stablecoin (USDC+)', async () => {
    const response = await request(app).get('/stablecoin/types').expect(200);

    const { data } = response.body;

    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(1);

    const usdcPlus = data[0];
    expect(usdcPlus).toMatchObject({
      index: 0,
      name: 'USDC+',
    });
    expect(typeof usdcPlus.index).toBe('number');
    expect(typeof usdcPlus.name).toBe('string');
  });

  it('should always include USDC+ with index 0', async () => {
    const response = await request(app).get('/stablecoin/types').expect(200);

    const hasUsdcPlus = response.body.data.some(
      (coin: any) => coin.index === 0 && coin.name === 'USDC+'
    );

    expect(hasUsdcPlus).toBe(true);
  });

  it('should return consistent data on multiple requests', async () => {
    const [res1, res2] = await Promise.all([
      request(app).get('/stablecoin/types').expect(200),
      request(app).get('/stablecoin/types').expect(200),
    ]);

    expect(res1.body).toEqual(res2.body);
  });

  it('should return 500 with error response when internal error occurs', async () => {
    const response = await request(app)
      .get('/stablecoin/types/error')
      .expect(500);

    expect(response.body).toEqual({
      success: false,
      message: 'Internal server error',
    });
  });

  it('should return JSON content type on success', async () => {
    await request(app)
      .get('/stablecoin/types')
      .expect('Content-Type', /application\/json/)
      .expect(200);
  });

  it('should not include extra fields beyond success and data', async () => {
    const response = await request(app).get('/stablecoin/types').expect(200);

    const keys = Object.keys(response.body);
    expect(keys).toEqual(['success', 'data']); // No extra fields
  });
});