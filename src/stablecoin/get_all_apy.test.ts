// src/stablecoin/get_all_apy.test.ts

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import {
  getAllApy,
  getAllApyNotFound,
  getAllApyError,
} from './get_all_apy';

describe('GET /stablecoin/apy - Get All Stablecoin APYs', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();

    // Mount routes
    app.get('/stablecoin/apy', getAllApy);
    app.get('/stablecoin/apy/not-found', getAllApyNotFound);
    app.get('/stablecoin/apy/error', getAllApyError);
  });

  it('should return 200 with success and array of APY data', async () => {
    const response = await request(app)
      .get('/stablecoin/apy')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: [
        {
          index: 0,
          apy: 224,
          timestamp: '2025-12-19T16:55:42.407Z',
        },
      ],
    });

    // Additional structural checks
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0].apy).toBe(224);
  });

  it('should include valid ISO 8601 timestamp', async () => {
    const response = await request(app).get('/stablecoin/apy').expect(200);

    const timestamp = response.body.data[0].timestamp;
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    expect(timestamp).toMatch(isoRegex);

    // Verify it's a valid date
    expect(new Date(timestamp).toISOString()).toBe(timestamp);
  });

  it('should return 404 with error response when simulated not found', async () => {
    const response = await request(app)
      .get('/stablecoin/apy/not-found')
      .expect(404);

    expect(response.body).toEqual({
      success: false,
      message: 'Invalid request data: depositAmount must be positive',
    });
  });

  it('should return 500 with internal server error response', async () => {
    const response = await request(app)
      .get('/stablecoin/apy/error')
      .expect(500);

    expect(response.body).toEqual({
      success: false,
      message: 'Internal server error',
    });
  });

  it('should always return success: true and non-empty data array on success', async () => {
    const response = await request(app).get('/stablecoin/apy').expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data).not.toHaveLength(0);
  });
});