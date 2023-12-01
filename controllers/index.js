const router = require('express').Router();
const multer = require('multer')
const htmlRoutes = require('./htmlRoutes')
const apiRoutes = require('./api')
const dashboardRoutes = require('./dashboardRoutes')
// const storage = multer.diskStorage({
//     destination: '../models/listing',
//     filename: (req, file, cb) => {
//         return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);
router.use('/profile', dashboardRoutes);
module.exports = router;