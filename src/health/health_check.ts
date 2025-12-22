// health.js

const express = require('express');

/**
 * GET /health
 * 
 * Mimics the official Reflect API health check endpoint.
 * Always returns 200 OK with a JSON response containing:
 * - success: true
 * - message: "API is running"
 * - timestamp: Current UTC time in ISO 8601 format with milliseconds and 'Z'
 *
 * Example response:
 * {
 *   "success": true,
 *   "message": "API is running",
 *   "timestamp": "2025-12-22T14:30:45.123Z"
 * }
 */
function healthCheck(req, res) {
    // Generate current UTC timestamp in the exact format: YYYY-MM-DDTHH:mm:ss.SSSZ
    const now = new Date();
    const timestamp = now.toISOString(); // This gives exactly the required format with .SSS and Z

    res.status(200).json({
        success: true,
        message: "API is running",
        timestamp: timestamp
    });
}

// Optional: If you want to mount this as a router
const router = express.Router();
router.get('/health', healthCheck);

module.exports = { healthCheck, router };