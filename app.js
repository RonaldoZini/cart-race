var express = require('express');
var http = require("http")
var app = express();
app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(5000, function () {
  const SerialPort = require('serialport');
  const Readline = require('@serialport/parser-readline');
  const port = new SerialPort('COM6', { baudRate: 9600 });
  const parser = port.pipe(new Readline({ delimiter: '\n' }));
  
  parser.on('data', data => {
    console.log(data);
  });
})