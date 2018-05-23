var express = require('express');
var router = express.Router();
const Todo = require('../models/todo');
const { registerOrLogin } = require('../controllers/user_controller');

/* GET home page. */
router.get('/', (req, res) => {
  console.log('index');
});

router.post('/fblogin', registerOrLogin)

module.exports = router;
