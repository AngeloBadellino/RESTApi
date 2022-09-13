/*
* The main file of the RESTful application server.
*/

// Dependencies
var fs = require('fs');
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./lib/config');
var handlers = require('./lib/handlers');
var helpers = require('./lib/helpers');

// The http server should respond to all the incoming requests on its port.
var httpServer = http.createServer(function(req, res){
    unifiedServer(req, res);
});

// The https server should respond to all the incoming requests on its port.
var httpsServeOptions = {
    'key' : fs.readFileSync('./https/key.pem'),
    'cert' : fs.readFileSync('./https/cert.pem')
}
var httpsServer = https.createServer(httpsServeOptions, function(req, res){
    unifiedServer(req, res);
});

// Start the http server.
httpServer.listen(config.httpPort, function(){
    console.log('HTTP listening on ' + config.httpPort);
});

// Start the https server.
httpsServer.listen(config.httpsPort, function(){
    console.log('HTTPS listening on ' + config.httpsPort);
});
var unifiedServer = function(req, res) {
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
           'trimmedpath' : path,
           'querystring' : queryStringObject,
           'method': httpMethod,
           'headers': httpHeaders,
           'payload':  helpers.parseJsonToObject(buffer)
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
}

// The router object that will redirect the request to the correct handler
var router = {
    'ping' : handlers.ping,
    'users' : handlers.users,
    'tokens' : handlers.tokens,
    'checks' : handlers.checks
  };