const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/test-database');
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Product and Shopping Cart API', () => {
  let testProduct;

  beforeEach(async () => {
    testProduct = {
      name: 'Test Product',
      description: 'Test description',
      price: 10,
    };

    const res = await request(app)
      .post('/api/products')
      .send(testProduct);

    testProduct._id = res.body._id;
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it('should create a new product', async () => {
    const newProduct = {
      name: 'Another Test Product',
      description: 'Another test description',
      price: 20,
    };

    const res = await request(app)
      .post('/api/products')
      .send(newProduct);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', newProduct.name);
  });

  it('should fetch all products', async () => {
    const res = await request(app)
      .get('/api/products');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toContainEqual(expect.objectContaining(testProduct));
  });

  it('should fetch a specific product', async () => {
    const res = await request(app)
      .get(`/api/products/${testProduct._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.objectContaining(testProduct));
  });

  it('should update a product', async () => {
    const updatedProduct = {
      name: 'Updated Product',
      price: 15,
    };

    const res = await request(app)
      .put(`/api/products/${testProduct._id}`)
      .send(updatedProduct);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ ...testProduct, ...updatedProduct }));
  });

  it('should delete a product', async () => {
    const res = await request(app)
      .delete(`/api/products/${testProduct._id}`);

    expect(res.statusCode).toBe(200);

    const getRes = await request(app)
      .get(`/api/products/${testProduct._id}`);

    expect(getRes.statusCode).toBe(404);
  });

  // Shopping Cart Tests
  describe('Shopping Cart API', () => {
    let cartId;

    it('should create a shopping cart', async () => {
      const res = await request(app)
        .post('/api/carts')
        .send();

      expect(res.statusCode).toBe(201);
      cartId = res.body._id;
    });

    it('should add a product to the cart', async () => {
      const res = await request(app)
        .post(`/api/carts/${cartId}/items`)
        .send({
          productId: testProduct._id,
          quantity: 2,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.items).toContainEqual(
        expect.objectContaining({
          productId: testProduct._id,
          quantity: 2,
        })
      );
    });

    it('should retrieve the cart', async () => {
      const res = await request(app)
        .get(`/api/carts/${cartId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('items');
    });

    it('should update the quantity of a product in the cart', async () => {
      const addRes = await request(app)
        .post(`/api/carts/${cartId}/items`)
        .send({
          productId: testProduct._id,
          quantity: 2,
        });

      const updateRes = await request(app)
        .put(`/api/carts/${cartId}/items/${testProduct._id}`)
        .send({
          quantity: 5,
        });

      expect(updateRes.statusCode).toBe(200);
      expect(updateRes.body.items).toContainEqual(
        expect.objectContaining({
          productId: testProduct._id,
          quantity: 5,
        })
      );
    });

    it('should remove a product from the cart', async () => {
      const addRes = await request(app)
        .post(`/api/carts/${cartId}/items`)
        .send({
          productId: testProduct._id,
          quantity: 2,
        });

      const removeRes = await request(app)
        .delete(`/api/carts/${cartId}/items/${testProduct._id}`);

      expect(removeRes.statusCode).toBe(200);

      const cartRes = await request(app)
        .get(`/api/carts/${cartId}`);

      expect(cartRes.body.items).not.toContainEqual(
        expect.objectContaining({
          productId: testProduct._id,
        })
      );
    });
  });
});
