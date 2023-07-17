const express = require("express");
const app = express();

app.get("/products", (req, res) => {
  console.log("Just got a GET request!");
  return res.status(200).json([
    {
      id: 1,
      name: "Zara simple T-shirt",
      tittle: "Zara T-shirt",
      description: "casual T-shirt ",
      price: 19.99,
      quantity: 100,
      rating: 4.7,
      discount: 0,
      createdAt: "2023-07-10T23:31:34.000Z",
      updatedAt: "2023-07-10T23:31:34.000Z",
      brand_id: 1,
      category_id: 1,
    },
    {
      id: 2,
      name: "second Zara T-shirt",
      tittle: "Zara T-shirt",
      description: "casual T-shirt ",
      price: 29.99,
      quantity: 10,
      rating: 4.4,
      discount: 15,
      createdAt: "2023-07-10T23:31:34.000Z",
      updatedAt: "2023-07-10T23:31:34.000Z",
      brand_id: 1,
      category_id: 1,
    },
    {
      id: 3,
      name: "old product",
      tittle: "Zara T-shirt",
      description: "casual T-shirt ",
      price: 29.99,
      quantity: 10,
      rating: 4.4,
      discount: 20,
      createdAt: "2023-04-10T23:31:34.000Z",
      updatedAt: "2023-04-10T23:31:34.000Z",
      brand_id: 2,
      category_id: 2,
    },
  ]);
});

app.get("/products/limited", (req, res) => {
  return res.status(200).json([
    {
      id: 2,
      name: "second Zara T-shirt",
      tittle: "Zara T-shirt",
      description: "casual T-shirt ",
      price: 29.99,
      quantity: 10,
      rating: 4.4,
      discount: 15,
      createdAt: "2023-07-10T23:31:34.000Z",
      updatedAt: "2023-07-10T23:31:34.000Z",
      brand_id: 1,
      category_id: 1,
    },
    {
      id: 3,
      name: "old product",
      tittle: "Zara T-shirt",
      description: "casual T-shirt ",
      price: 29.99,
      quantity: 10,
      rating: 4.4,
      discount: 20,
      createdAt: "2023-04-10T23:31:34.000Z",
      updatedAt: "2023-04-10T23:31:34.000Z",
      brand_id: 2,
      category_id: 2,
    },
  ]);
});

app.get("/products/handpicked", (req, res) => {
  return res.status(200).json([
    {
      id: 1,
      name: "Zara simple T-shirt",
      tittle: "Zara T-shirt",
      description: "casual T-shirt ",
      price: 19.99,
      quantity: 100,
      rating: 4.7,
      discount: 0,
      createdAt: "2023-07-10T23:31:34.000Z",
      updatedAt: "2023-07-10T23:31:34.000Z",
      brand_id: 1,
      category_id: 1,
    },
  ]);
});

app.get("/products/popular", (req, res) => {
  return res.status(200).json([
    {
      id: 1,
      name: "Zara simple T-shirt",
      tittle: "Zara T-shirt",
      description: "casual T-shirt ",
      price: 19.99,
      quantity: 100,
      rating: 4.7,
      discount: 0,
      createdAt: "2023-07-10T23:31:34.000Z",
      updatedAt: "2023-07-10T23:31:34.000Z",
      brand_id: 1,
      category_id: 1,
    },
  ]);
});

app.get("/products/new", (req, res) => {
  return res.status(200).json([
    {
      id: 1,
      name: "Zara simple T-shirt",
      tittle: "Zara T-shirt",
      description: "casual T-shirt ",
      price: 19.99,
      quantity: 100,
      rating: 4.7,
      discount: 0,
      createdAt: "2023-07-10T23:31:34.000Z",
      updatedAt: "2023-07-10T23:31:34.000Z",
      brand_id: 1,
      category_id: 1,
    },
    {
      id: 2,
      name: "second Zara T-shirt",
      tittle: "Zara T-shirt",
      description: "casual T-shirt ",
      price: 29.99,
      quantity: 10,
      rating: 4.4,
      discount: 15,
      createdAt: "2023-07-10T23:31:34.000Z",
      updatedAt: "2023-07-10T23:31:34.000Z",
      brand_id: 1,
      category_id: 1,
    },
  ]);
});

app.get("/products/search", (req, res) => {
  return res.status(200).json([
    {
      id: 1,
      name: "Zara simple T-shirt",
      tittle: "Zara T-shirt",
      description: "casual T-shirt ",
      price: 19.99,
      quantity: 100,
      rating: 4.7,
      discount: 0,
      createdAt: "2023-07-10T23:31:34.000Z",
      updatedAt: "2023-07-10T23:31:34.000Z",
      brand_id: 1,
      category_id: 1,
      brand: {
        id: 1,
        name: "Zara",
        description: "clothing company",
        img: "https://logos-world.net/zara-logo/",
      },
    },
    {
      id: 2,
      name: "second Zara T-shirt",
      tittle: "Zara T-shirt",
      description: "casual T-shirt ",
      price: 29.99,
      quantity: 10,
      rating: 4.4,
      discount: 15,
      createdAt: "2023-07-10T23:31:34.000Z",
      updatedAt: "2023-07-10T23:31:34.000Z",
      brand_id: 1,
      category_id: 1,
      brand: {
        id: 1,
        name: "Zara",
        description: "clothing company",
        img: "https://logos-world.net/zara-logo/",
      },
    },
  ]);
});
app.get("/products/categories", (req, res) => {
  return res.status(200).json([
    {
      id: 1,
      name: "T-shirts",
      description: "no need to describe a T-shirts category :)",
      img: "https://blog.treasurie.com/types-of-t-shirts/",
    },
    {
      id: 2,
      name: "test categorey",
      description: "qqqqqqqqqqqqqqqqqqqq",
      img: null,
    },
  ]);
});
app.get("/products/brands", (req, res) => {
  return res.status(200).json([
    {
      id: 1,
      name: "Zara",
      description: "clothing company",
      img: "https://logos-world.net/zara-logo/",
    },
    {
      id: 2,
      name: "my brand",
      description: "non of your bussnis",
      img: null,
    },
  ]);
});
app.get("/brands/products/1", (req, res) => {
  return res.status(200).json([
    {
      id: 1,
      name: "Zara simple T-shirt",
      tittle: "Zara T-shirt",
      description: "casual T-shirt ",
      price: 19.99,
      quantity: 100,
      rating: 4.7,
      discount: 0,
      createdAt: "2023-07-10T23:31:34.000Z",
      updatedAt: "2023-07-10T23:31:34.000Z",
      brand_id: 1,
      category_id: 1,
    },
    {
      id: 2,
      name: "second Zara T-shirt",
      tittle: "Zara T-shirt",
      description: "casual T-shirt ",
      price: 29.99,
      quantity: 10,
      rating: 4.4,
      discount: 15,
      createdAt: "2023-07-10T23:31:34.000Z",
      updatedAt: "2023-07-10T23:31:34.000Z",
      brand_id: 1,
      category_id: 1,
    },
  ]);
});
app.get("/categories/products/1", (req, res) => {
  return res.status(200).json([
    {
      id: 1,
      name: "Zara simple T-shirt",
      tittle: "Zara T-shirt",
      description: "casual T-shirt ",
      price: 19.99,
      quantity: 100,
      rating: 4.7,
      discount: 0,
      createdAt: "2023-07-10T23:31:34.000Z",
      updatedAt: "2023-07-10T23:31:34.000Z",
      brand_id: 1,
      category_id: 1,
    },
    {
      id: 2,
      name: "second Zara T-shirt",
      tittle: "Zara T-shirt",
      description: "casual T-shirt ",
      price: 29.99,
      quantity: 10,
      rating: 4.4,
      discount: 15,
      createdAt: "2023-07-10T23:31:34.000Z",
      updatedAt: "2023-07-10T23:31:34.000Z",
      brand_id: 1,
      category_id: 1,
    },
  ]);
});
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
