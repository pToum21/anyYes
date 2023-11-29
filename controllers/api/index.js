const router = require('express').Router();
const userRoutes = require('./userRoutes')
const listingRoutes = require('./listingRoutes')
const categoryRoutes = require('./categoryRoutes')

router.use('/users', userRoutes);
router.use('/listings', listingRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
