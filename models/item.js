const mongoose = require('mongoose');
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  stock: { type: Number },
  picture: { type: String }
},{
  timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;
