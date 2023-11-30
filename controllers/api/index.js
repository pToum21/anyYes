const router = require('express').Router();
const userRoutes = require('./userRoutes')
const listingRoutes = require('./listingRoutes')
const categoryRoutes = require('./categoryRoutes')
const orderRoutes = require('./orderRoutes')


router.use('/users', userRoutes);
router.use('/listings', listingRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);





module.exports = router;
