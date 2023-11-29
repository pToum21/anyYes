
const {Order, User, Listing, Category} = require('../models')

const router = require('express').Router();

router.get('/', async (req, res) => {
   res.status(200).json('hello')
})

module.exports = router;