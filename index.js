/*
* The main file of the RESTful application server.
*/

// Dependencies
var http = require('http');
const { StringDecoder } = require('string_decoder');
var url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;

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

    // Get the payload
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function(data){
        buffer += decoder.write(data);
    });
    req.on('end', function(){
        buffer += decoder.end();

        // The end evend of the requests is always being fired.
        console.log('Request received on ' + path + ' with method ' + httpMethod);
        console.log('Query string parameters: ', queryStringObject);
        console.log('Headers: ' + httpHeaders);
        console.log('Payload: ' + buffer);
    });
});

// Start the server and have it listen on the port 3000.
server.listen(3000, function(){
    console.log("The server is listening on the port 3000 now.");
});
