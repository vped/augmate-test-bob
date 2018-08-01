const Price = require('./coinPriceModal');
const zmq = require('zeromq');
let responder = zmq.socket('rep');
responder.connect('tcp://127.0.0.1:7000');

responder.on('message', (msg)=> {
  console.log('Request Received', JSON.parse(msg.toString()));
  saveDescription(JSON.parse(msg.toString()))
});

let saveDescription = function(body) {
  Price(body).save((err,result)=>{
  	 if(err){
  	 	console.log(err,"err")
  	 	  responder.send(JSON.stringify({Error:"Error in Description Save"}));
  	 }else {
  	 	console.log("Saved To Coin DB:",JSON.stringify(result))
  	 	responder.send(JSON.stringify({"success": "Added Description Successfully with UUID: "+ result.uid, "uid": result.uid}));
  	 }
  })
}