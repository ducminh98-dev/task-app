const express = require('express')
const router = express.Router()
const BookController = require('../controller/bookControllers')
const authen = require('../middleware/auth')
router.get('',BookController.get )
router.post('',authen.auth,BookController.post)

module.exports = router