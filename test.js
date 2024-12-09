const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Shopper = require('../models/Shopper'); // Assuming you have this model

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/test-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Returns API and Shopper CRUD', () => {
  let productIds = [];
  let shopperId;

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

    // Create a sample shopper for testing CRUD
    const shopper = { name: 'John Doe', email: 'john@example.com', address: '123 State College' };
    const shopperRes = await request(app).post('/api/shopper').send(shopper);
    shopperId = shopperRes.body._id;
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  // Product search test
  it('should search for products by query', async () => {
    const query = 'Sweatshirt';
    const res = await request(app).get(`/api/products/search?q=${query}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach(product => {
      expect(product.name).toMatch(new RegExp(query, 'i'));
    });
  });

  // Submit return request test
  it('should submit a return request for selected products', async () => {
    const returnRequest = [
      { productId: productIds[0], name: 'Penn State Crew Neck Sweatshirt' },
      { productId: productIds[2], name: 'Penn State Football Hooded Sweatshirt' },
    ];

    const res = await request(app).post('/api/returns').send(returnRequest);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Return request submitted successfully');
  });

  // Handle empty return request
  it('should handle submitting an empty return request gracefully', async () => {
    const returnRequest = [];
    const res = await request(app).post('/api/returns').send(returnRequest);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('No products selected for return');
  });

  // Invalid product ID in return request
  it('should validate invalid product IDs in return request', async () => {
    const returnRequest = [
      { productId: 'invalid-id', name: 'Non-existent product' },
    ];

    const res = await request(app).post('/api/returns').send(returnRequest);
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Product not found');
  });

  // Shopper CRUD Tests
  // Create Shopper
  it('should create a new shopper', async () => {
    const shopper = { name: 'Jane Doe', email: 'jane@example.com', address: '456 College Ave' };
    const res = await request(app).post('/api/shopper').send(shopper);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(shopper.name);
    expect(res.body.email).toBe(shopper.email);
    expect(res.body.address).toBe(shopper.address);
  });

  // Read Shopper
  it('should get shopper details by ID', async () => {
    const res = await request(app).get(`/api/shopper/${shopperId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(shopperId);
    expect(res.body.name).toBe('John Doe');
    expect(res.body.email).toBe('john@example.com');
  });

  // Update Shopper
  it('should update shopper details', async () => {
    const updatedShopper = { name: 'Johnathan Doe', email: 'johnathan@example.com', address: '789 New Address' };
    const res = await request(app).put(`/api/shopper/${shopperId}`).send(updatedShopper);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(updatedShopper.name);
    expect(res.body.email).toBe(updatedShopper.email);
    expect(res.body.address).toBe(updatedShopper.address);
  });

  // Delete Shopper
  it('should delete shopper by ID', async () => {
    const res = await request(app).delete(`/api/shopper/${shopperId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Shopper deleted successfully');
  });
});

