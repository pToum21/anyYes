const router = require('express').Router();
const htmlRoutes = require('./htmlRoutes')
const apiRoutes = require('./api')
const profileRoutes = require('./profileRoutes')
const checkoutRoutes = require('./checkoutRoutes')



router.use('/', htmlRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);

module.exports = router;