var http = require('http');
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write('Hi there, Yash!');
    res.end();
}).listen(process.env.PORT || 3010);
