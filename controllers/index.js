const router = require('express').Router();
const multer = require('multer')
const htmlRoutes = require('./htmlRoutes')
const apiRoutes = require('./api')
const profileRoutes = require('./profileRoutes')



router.use('/', htmlRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);

module.exports = router;