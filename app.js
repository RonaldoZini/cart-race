var express = require('express');
var http = require("http")
var app = express();
app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(5000, function () {
  var WebSocketServer = require("ws").Server
var wss = new WebSocketServer({server: server})

  const SerialPort = require('serialport');
  const Readline = require('@serialport/parser-readline');
  const port = new SerialPort('COM6', { baudRate: 9600 });
  const parser = port.pipe(new Readline({ delimiter: '\n' }));
  
  parser.on('data', data => {
    console.log(data);

    var value = ""
    for (p in data) value += data[p];
    wss.clients.forEach(function each(ws) {
      ws.send(JSON.stringify(value), function() {  })
    });
  });
})