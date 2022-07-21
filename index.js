/*
* The main file of the RESTful application server.
*/

// Dependencies
const { stat } = require('fs');
var http = require('http');
const { StringDecoder } = require('string_decoder');
var url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all the incoming requests with a string.
var server = http.createServer(function(req, res){

    // Get and parse the request's url
    var parsedURL = url.parse(req.url, true);
    var path = parsedURL.pathname.replace(/^\/+|\/+$/g, '');

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

        //Select the hanlder
        chosenHandler = typeof(router[path]) !== 'undefined' ? router[path] : handlers.notFound;

        var data = {
            'Trimmed Path' : path,
            'Query String' : queryStringObject,
            'Method': httpMethod,
            'Headers': httpHeaders,
            'Payload': buffer
        };

        chosenHandler(data, function(statusCode, payload){
            // Use the status code from the handler implementation
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
            
            // Get and shape the paylod from the handler
            payload = typeof(payload) === 'object' ? payload : {};
            var payloadString = JSON.stringify(payload);
            
            
            // Return the response as a json
            res.setHeader('Content-Type', 'application/json')
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log('Returning this response', statusCode, payloadString);
        });
    }); 
});

// Start the server and have it listen on the port 3000.
server.listen(3000, function(){
    console.log("The server is listening on the port 3000 now.");
});

// We define the handler we use to return back the data
var handlers = {};

handlers.sample = function (data, callback){
    callback(404, {'name': 'sample handler'});
}

handlers.notFound = function (data, callback){
    callback(406);
}

// The router object that will redirect the request to the correct handler
router = {
    'sample' : handlers.sample
}
