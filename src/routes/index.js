const express = require('express');

const router = express.Router();

// import config .env
require("dotenv").config();

// Controller
const { addUsers, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { getProduct, addProduct } = require('../controllers/product')
// const { getTransactions, addTransaction } = require('../controllers/transaction')
const { register, login } = require('../controllers/auth')

// Middleware
const { auth } = require('../middlewares/auth')
// import middleware here
const {uploadFile} = require('../middlewares/uploadFile')

// ROUTE USER
router.post('/user', addUsers)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

// ROUTE PRODUCT
router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.patch('/product/:id', auth, updateProduct)
router.delete('/product/:id', auth, deleteProduct)
// router.get('/products', getProduct)
router.post('/product', auth, uploadFile("image"), addProduct) // place middleware before controller

// ROUTE TRANSACTIONS
// router.get('/transactions', getTransactions)
// router.post('/transaction', auth, addTransaction)

// ROUTE AUTH
router.post('/register', register)
router.post('/login', login)

// ROUTE TOPPINGS
router.get('/toppings', getToppings)
router.get('/topping/:id', getTopping)
router.patch('/topping/:id', auth, updateTopping)
router.delete('/topping/:id', auth, deleteTopping)
router.post('/topping', auth, uploadFile("image"), addTopping)

module.exports = router