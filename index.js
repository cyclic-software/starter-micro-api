var http = require('http');
var dt   = require('./DateModule.js');
var fs = require('fs');

http.createServer(function (req, res) {
    //console.log(`Just got a request at ${req.url}!`)
    //res.write('Hi there, Yash!');
    //res.write("Date-Time is: " + dt.myDateTime());
    fs.readFile('index.html',function(err,data){
        console.log(reading data);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
    });
    res.end();
}).listen(process.env.PORT || 3010);
