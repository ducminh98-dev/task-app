const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const taskControllers = require('../controller/taskController')


router.get('',auth.auth, taskControllers.get)
router.post('',auth.auth, taskControllers.post)

router.patch('/:id',auth.auth,taskControllers.patch)

router.delete('/:id',auth.auth,taskControllers.delete)

module.exports = router