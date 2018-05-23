const User = require('../models/user')
const todo = require('../models/todo')
const jwt = require('jsonwebtoken')

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

                console.log('adanih login');

                const jwtToken = jwt.sign({ email: req.body.email, id: user._id }, 'MYSUPERSECRET')
                res.status(200).json({ jwtToken })

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

    User.findOne({ email: req.body.email }, function(err, user) {

      if (err) {
        res.status(404).json('bad request')
      } else {

        if (user) {

          res.status(404).json('email is already exists')

        } else {

          const newUser = {
            email: req.body.email,
            password: req.body.password
          }

          User.create(newUser, function(err, success) {
            if (err) {
              res.status(404).json('bad request')
            } else {
              res.status(201).json('success add user');
            }
          })

        }

      }

    })

  },

  registerOrLogin (req, res) {

    User.find({ email: req.body.email }, (err, data) => {

      if (data.length > 0) {

        const jwtToken = jwt.sign({ email: data[0].email, id: data[0]._id }, 'MYSUPERSECRET')
        res.status(200).json({ jwtToken })

      } else {

        const newUser = {
          email: req.body.email,
          password: 'asd'
        }

        User.create(newUser, function(err, success) {
          if (err) {
            res.status(404).json('bad request')
          } else {
            res.status(201).json('success add user');
          }
        })

      }

    })

  }

}
