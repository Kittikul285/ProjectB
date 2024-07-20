const express = require('express')
const authenticate = require('../middlewares/authenticate')
const order = require('../constrollers/order-constroller')
const router = express.Router()


router.post('/order',order.createOrder)






module.exports = router