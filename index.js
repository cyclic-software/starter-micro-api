
var http = require('http');
http.createServer(function (req, res) {
    const url = "https://jsonplaceholder.typicode.com/posts/1";
    console.log(`Just got a request at ${req.url}!`)

    res.write(req.url)
    res.end();	
}).listen(process.env.PORT || 3000);
