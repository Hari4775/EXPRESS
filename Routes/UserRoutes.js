const express= require('express')
const { Login, Register, current } = require('../controller/UserController')
const validateToken = require('../Middleware/ValidateTokenHandler')

const router= express.Router()

router.post('/login',Login)
router.post('/register',Register)
router.get('/current',validateToken, current)



module.exports= router