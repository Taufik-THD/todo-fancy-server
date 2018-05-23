const User = require('../models/user');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

module.exports = {

  Login(req, res){

    User.findOne({email: req.body.email}, function(err, user){

      if (err) {

        res.status(404).json('user not found')

      } else {

        if (user) {

          user.comparePassword(req.body.password, function(err, isMatch) {

            if (err) {
              res.status(404).json(err)
            } else {

              if (!isMatch) {

                res.status(400).json('wrong password')

              } else {

                const jwtToken = jwt.sign({ email: req.body.email, id: user._id }, 'MYSUPERSECRET')

                if (user.role == 'admin') {

                  res.status(200).json({ jwtToken, role: 'admin' })

                } else {

                  res.status(200).json({ jwtToken, role: 'user' })

                }

              }

            }

          })

        } else {

          res.status(400).json('user not found')

        }

      }

    })

  },

  Register(req, res){

    const newUser = {
      email: req.body.email,
      password: req.body.password,
      role: 'user'
    }

    User.create(newUser, function(err, success) {
      if (err) {
        res.status(404).json('bad request')
      } else {
        res.status(201).json('success add user');
      }
      })


  }

};
