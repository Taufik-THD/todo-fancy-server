var express = require('express');
var router = express.Router();
const { Login, Register } = require('../controllers/user_controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', Register)

router.post('/login', Login)

module.exports = router;
