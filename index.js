
var http = require('http');
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)




const https = require("https");
const url = "https://jsonplaceholder.typicode.com/posts/1";

https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    body = JSON.parse(body);
    console.log(body);
  });
});

  }).listen(process.env.PORT || 3000);
