'use strict';

const express = require('express');
let  app = express();
const mongoose = require('mongoose');
let router = express.Router();
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
require('./bobCtrl');

 
//Connects to local mongodb Alice collection
mongoose.connect('mongodb://localhost/coin', (err,database)=> {
    if(err) {
      console.error('MongoDB Connection Error:',err);
      process.exit(1);
    }else {
       console.log('BoB Database Connection Ready')
    }
});

let port = '4000';//Port Number
app.set('port',port);
let server = http.createServer(app);
server.listen(port);
server.on('error',onError);
server.on('listening',onListening);

//localhost:3000, loads this html file to browser
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname + '/index.html'));
});


//http error handler.
function onError(error) {
	switch(error.code) {
			case 'EADDRINUSE':
			console.error('port:', port, 'is already in  use');
			process.exit(1);
			break;
			default:
				throw error;
			}
		}

//server connection message
function onListening() {
	console.log('Bob listening on :',port);
}

module.exports = app;
