
const mongoose = require('mongoose');
let   Schema = mongoose.Schema;
const crypto = require('crypto');

let coinPriceSchema = new Schema({
    symbol              : {type : String, required: true},
    uid                 : {type : String},
    price               : {type : String, required: true},
    description         : {type : String,required: true},
    createdDate         : {type : Date, default: Date.now},
    updatedDate         : {type : Date, default: Date.now}
});

coinPriceSchema.pre('save', function (next) {
    let description = this;
    let uid = 'bob' + crypto.randomBytes(11).toString('hex');
    description.uid = uid;
    next();
});


let coinPrice = mongoose.model('coinPrice', coinPriceSchema);

module.exports = coinPrice;