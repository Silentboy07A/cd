
const request = require('supertest');
const express = require('express');

const app = express();
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'user-service' });
});

describe('User Service', () => {
    it('should return health status', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'ok');
    });
});
