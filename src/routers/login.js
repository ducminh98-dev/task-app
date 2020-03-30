const express = require('express')
const router = express.Router();
const loginController = require('../controller/loginControllers')

router.post('',loginController.post)

module.exports = router