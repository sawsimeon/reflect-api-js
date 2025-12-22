// src/health/health_check.test.ts

import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import { healthCheck } from './health_check';

describe('GET /health - Health Check Endpoint', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.get('/health', healthCheck);
  });

  it('should return 200 OK with the correct health response structure', async () => {
    const response = await request(app).get('/health').expect(200);

    expect(response.body).toEqual({
      success: true,
      message: 'API is running',
      timestamp: expect.any(String),
    });
  });

  it('should return a timestamp in strict ISO 8601 format with milliseconds and Z', async () => {
    const response = await request(app).get('/health').expect(200);

    const { timestamp } = response.body;

    // Regex: YYYY-MM-DDTHH:mm:ss.SSSZ
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    expect(timestamp).toMatch(iso8601Regex);

    // Verify round-trip validity
    const date = new Date(timestamp);
    expect(date.toISOString()).toBe(timestamp);
  });

  it('should return a recent timestamp (within 5 seconds of request time)', async () => {
    const before = new Date();

    const response = await request(app).get('/health').expect(200);

    const after = new Date();
    const { timestamp } = response.body;
    const parsed = new Date(timestamp);

    const diffBefore = Math.abs(before.getTime() - parsed.getTime());
    const diffAfter = Math.abs(after.getTime() - parsed.getTime());

    const minDiff = Math.min(diffBefore, diffAfter);

    expect(minDiff).toBeLessThanOrEqual(5000); // ≤ 5 seconds
  });

  it('should always set success to true and message to "API is running"', async () => {
    const response = await request(app).get('/health').expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('API is running');
  });
});