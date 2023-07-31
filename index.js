var http = require('http');
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write('Pavlo Tkachenko!');
    res.write('This is 2nd HomeTask!');
    res.write('1st is http://hometask.byethost5.com/');
    res.end();
}).listen(process.env.PORT || 3000);
