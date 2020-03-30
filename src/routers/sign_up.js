const express = require('express')
const router = express.Router();
const sign_upControllers = require('../controller/sign_upControllers')


router.post('',sign_upControllers.post)

module.exports = router