var http = require('http');
var dt   = require('./DateModule.js');
var fs = require('fs');

http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write('Hi there, Yash!');
    res.write("Date-Time is: " + dt.myDateTime());
    fs.readFile('index.html',function(err,data){
        res.write(date);
    }
    res.end();
}).listen(process.env.PORT || 3010);
