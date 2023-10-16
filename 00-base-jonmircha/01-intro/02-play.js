'use strict'

var http = require('http')

function webServer (req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'})
    res.end('<h1> hi, from Node.js </h1> <p>She doesnt love me</p>')
}

http.createServer(webServer).listen(3000, 'localhost')

console.log('This server is running at our server, localhost:3000')
