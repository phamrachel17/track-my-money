const express = require('express')

// controller functions
const { addUser, getUser } = require('../controllers/userController')

const router = express.Router()

// Login route
router.post('/login', getUser)

// Signup Route
router.post('/signup', addUser)

module.exports = router