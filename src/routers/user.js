const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const controller = require('../controller/userControllers.js')

router.get('/me',auth.auth,controller.get)
router.patch('',auth.auth,controller.patch)
router.delete('',auth.auth,controller.delete)

module.exports =router