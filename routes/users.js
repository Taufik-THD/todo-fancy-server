const express = require('express');
const router = express.Router();
const { Login, Register, Loginfb } = require('../controllers/user_controller');

router.get('/', (req, res) => {
  console.log('getter');
})

router.post('/', Login )

router.post('/register', Register )

// router.post('/loginfb', (req, res) => {
//   console.log('login fb nih');
// })

module.exports = router;
