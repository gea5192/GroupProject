const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/test-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Returns API', () => {
  let productIds = [];

  beforeEach(async () => {
    // Create sample products for testing
    const products = [
      { name: 'Penn State Crew Neck Sweatshirt', description: 'A warm sweatshirt', price: 50 },
      { name: 'Penn State Stainless Steel Tumbler', description: 'A sleek tumbler', price: 20 },
      { name: 'Penn State Football Hooded Sweatshirt', description: 'A stylish hoodie', price: 60 },
    ];

    for (const product of products) {
      const res = await request(app).post('/api/products').send(product);
      productIds.push(res.body._id);
    }
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it('should search for products by query', async () => {
    const query = 'Sweatshirt';

    const res = await request(app)
      .get(`/api/products/search?q=${query}`); // 

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach(product => {
      expect(product.name).toMatch(new RegExp(query, 'i'));
    });
  });

  it('should submit a return request for selected products', async () => {
    const returnRequest = [
      { productId: productIds[0], name: 'Penn State Crew Neck Sweatshirt' },
      { productId: productIds[2], name: 'Penn State Football Hooded Sweatshirt' },
    ];

    const res = await request(app)
      .post('/api/returns')
      .send(returnRequest); //

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Return request submitted successfully');
  });

  it('should handle submitting an empty return request gracefully', async () => {
    const returnRequest = [];

    const res = await request(app)
      .post('/api/returns')
      .send(returnRequest);

    expect(res.statusCode).toBe(400); //backend responds with a 400 for bad requests
    expect(res.body.error).toBe('No products selected for return');
  });

  it('should validate invalid product IDs in return request', async () => {
    const returnRequest = [
      { productId: 'invalid-id', name: 'Non-existent product' },
    ];

    const res = await request(app)
      .post('/api/returns')
      .send(returnRequest);

    expect(res.statusCode).toBe(404); // backend responds with a 404 for invalid IDs
    expect(res.body.error).toBe('Product not found');
  });
});
