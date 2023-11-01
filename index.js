var http = require('http');
var dt   = require('./DateModule.js');
var fs = require('fs');
//var data1;

http.createServer(function (req, res) {
    //console.log(`Just got a request at ${req.url}!`)
    //res.write('Hi there, Yash!');
    //res.write("Date-Time is: " + dt.myDateTime());
    fs.readFile('./index.html','utf8',function(err,data){
        console.log("reading data");
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        //data1 = data;
        console.log(data);
        console.log("error: " + err);
        return res.end();
    });
    res.write("<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>");
    res.end();
}).listen(process.env.PORT || 3010);
