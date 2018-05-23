const Item = require('../models/item')
const Cart = require('../models/cart')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports = {

  getItem(req, res) {

    Item.find({}, (err, data) => {
      if (err) {
        res.status(404).json('bad request')
      } else {
        res.status(200).json({ data })
      }
    })

  },

  addItem(req, res) {

    const newItem = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      picture: req.file.cloudStoragePublicUrl
    }

    Item.create(newItem, function(err, success) {
      if (err) {
        res.status(404).json('bad request')
      } else {
        res.status(201).json('success add new item');
      }
    })

  },

  addToCart(req, res){

    Cart.find({ ItemId: req.body.ItemId }, function(err, data){
      if (data.length > 0) {
        data[0].Qty += 1
        data[0].save()
      } else {
        const item = {
          name: req.body.name,
          ItemId: req.body.ItemId,
          price: req.body.price,
          Qty: 1
        }
        Cart.create(item, function(err, success){
          if (err) {
            res.status(404).json(err)
          } else {
            res.status(201).json('success')
          }
        })
      }
    })


  },

  getMyCart(req, res){

    Cart.find({}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data)
      }
    })

  },

  removeQty(req, res){

    Cart.find({ ItemId: req.body.itemId }, function(err, data){

      data[0].Qty -= 1
      data[0].save()
      res.status(201).json('success')

    })

  },

  removeAllCart(req, res){

    Cart.deleteMany({}, (err, success) => {
      res.status(201).json('deleted')
    })

  },

  checkout(req, res){
    let total = 0

    Cart.find({}, (err, data) => {

      data.forEach(val => {
        total += (val.price * val.Qty)

        Item.find({ name:val.name }, (err, item) => {
          item[0].stock -= val.Qty
          item[0].save()
        })
      })

      res.status(200).json(total)

      Cart.deleteMany({}, (err, success) => {
        console.log('deleted');
      })

    })
  },

  deleteItem(req, res){

    Item.deleteOne({ _id: req.params.id }, (err, data) => {
      res.status(200).json('deleted')
    })

  }

};
