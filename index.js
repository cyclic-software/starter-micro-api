var http = require("http");
var url = require("url");

http
  .createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log(`Just got a request at ${pathname}!`);

    if (pathname === "/products") {
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
    } else if (pathname === "/products/limited") {
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
    } else if (pathname === "/products/handpicked") {
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
    } else if (pathname === "/products/popular") {
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
    } else if (pathname === "/products/new") {
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
    } else if (pathname === "/products/search") {
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
    } else if (pathname === "/categories/products/1") {
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
    } else if (pathname === "/brands/1") {
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
    } else if (pathname === "/brands") {
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
    } else if (pathname === "/categories") {
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
    } else {
      // Handle other requests
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("404 Not Found");
      res.end();
    }
  })
  .listen(process.env.PORT || 3000);
