const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cartSchema = new Schema({
  name: { type: String },
  ItemId: { type:String },
  price: { type:Number },
  Qty: { type:Number }
},{
  timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart;
