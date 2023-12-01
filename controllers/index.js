const router = require('express').Router();
const multer = require('multer')
const htmlRoutes = require('./htmlRoutes')
const apiRoutes = require('./api')
const profileRoutes = require('./profileRoutes')
const ordersHtmlRoutes = require('./orderHtmlRoutes')


router.use('/', htmlRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);
router.use('/orders', ordersHtmlRoutes);
module.exports = router;