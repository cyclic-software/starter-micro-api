var http = require("http");

http
  .createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`);

    if (req.method === "GET") {
      // Handle GET request
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write("This is a GET request!");
      res.end();
    } else if (req.method === "POST") {
      // Handle POST request
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        // Process the POST request body
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write(`This is a POST request! Body: ${body}`);
        res.end();
      });
    }
  })
  .listen(process.env.PORT || 3000);
