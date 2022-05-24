/*
* The main file of the RESTful application server.
*/

// Dependencies
var http = require('http');
var url = require('url');

// The server should respond to all the incoming requests with a string.
var server = http.createServer(function(req, res){

    // Get and parse the request's url
    var parsedURL = url.parse(req.url, true);
    var path = parsedURL.pathname.replace('/^\/+|\/+$/g', '');

    // Get the query string as an object
    var queryStringObject = parsedURL.query;

    // Get the HTTP method
    var httpMethod = req.method.toLowerCase();

    // Get the header
    var httpHeaders = req.rawHeaders;

    // Send the response
    console.log('The server is listening on port 3000 now.')

    // Logging the request
    console.log('Request received on ' + path + ' with method ' + httpMethod);
    console.log('Query string parameters: ', queryStringObject);
    console.log('Headers: ' + httpHeaders);

});

// Start the server and have it listen on the port 3000.
server.listen(3000, function(){
    console.log("The server is listening on the port 3000 now.");
});
