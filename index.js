var http = require('http');
var dt   = require('./DateModule.js');
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write('Hi there, Yash!');
    res.write("Date-Time is: " + dt.myDateTime());
    res.end();
}).listen(process.env.PORT || 3010);
