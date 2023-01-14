require('dotenv').config()
const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
  })
  
afterEach(async () => {
    await mongoose.connection.close();
})

describe("GET /api/products", () => {
    it("should return all products", async () => {
      const res = await request(app).get("/api/products");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    })
})
  
describe("GET /api/products/:id", () => {
    it("should return a product", async () => {
        const product = await Product.create({
            name: 'Product 1',
            price: 100,
            description: 'description 1'
        })
      const res = await request(app).get(
        `/api/products/${product._id}`
      );
      expect(res.statusCode).toBe(200)
      expect(res.body.name).toBe("Product 1")
    })
})

  
describe("POST /api/products", () => {
    it("should create a product", async () => {
      const res = await request(app).post("/api/products").send({
        name: "Product 2",
        price: 1009,
        description: "Description 2",
      })
      expect(res.statusCode).toBe(201)
      expect(res.body.name).toBe("Product 2")
    })
})

describe("PUT /api/products/:id", () => {
    it("should update a product", async () => {
        const product = await Product.create({
            name: 'Product 1',
            price: 100,
            description: 'description 1'
        })
      const res = await request(app)
        .patch(`/api/products/${product._id}`)
        .send({
          name: "Product 4",
          price: 104,
          description: "Description 4",
        })
      expect(res.statusCode).toBe(200);
      expect(res.body.price).toBe(104);
    })
})
  
  
describe("DELETE /api/products/:id", () => {
    it("should delete a product", async () => {
        const product = await Product.create({
            name: 'Product 1',
            price: 100,
            description: 'description 1'
        })
      const res = await request(app).delete(
        `/api/products/${product._id}`
      );
      expect(res.statusCode).toBe(200)
    })
  })


  
  