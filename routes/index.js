'use strict'
const express = require('express'),
      router = express.Router(),
      images = require('../helpers/images')

const multer = require('multer');
const { sendUploadToGCS } = require('../middlewares/uploadGcs');

const { addItem, getItem, deleteItem, addToCart, getMyCart, removeQty, removeAllCart, checkout } = require('../controllers/item_controller')

const upload = multer({
 storage  : multer.memoryStorage(),
 limits   : {
   fileSize: 10*1024*1024
   }
})

/* GET main endpoint. */
router.get('/', getItem )

router.post('/upload', upload.single('item'), sendUploadToGCS, addItem)

router.get('/getMyCart', getMyCart)

router.post('/addToCart', addToCart)

router.post('/removeQty', removeQty)

router.post('/checkout', checkout)

router.post('/logout', removeAllCart)

router.delete('/:id', deleteItem)

module.exports = router
