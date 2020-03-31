const express = require('express')
const router = express.Router();
const loginController = require('../controller/loginControllers')
const auth = require('../middleware/auth')


router.post('',loginController.post)
router.post('/logout',auth.auth,loginController.logout)
router.post('/logall',auth.auth,loginController.logall)

module.exports = router