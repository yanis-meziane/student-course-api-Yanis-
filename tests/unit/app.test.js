const request = require('supertest');
const app = require('../../src/app');

// Essaie de faire une redirection avec une route qui n'existe pas 

describe('Error middlewares', () => {
    test('should return 404 for unknown routes', async () => {
        const res = await request(app).get('/wrongRoutes');
    
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Not Found');
    });
});