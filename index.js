// The main file of the RESTful application server.

var http = require('http');

// The server should respond to all the incoming request with a string.
var server = http.createServer(function(req,res){
    res.end('Hello world\n');
});

// Start the server and have it listen on the port 3000.
server.listen(3000, function(){
    console.log("The server is listening on the port 3000 now.");
});
