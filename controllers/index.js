const router = require('express').Router();
const multer = require('multer')
const htmlRoutes = require('./htmlRoutes')
const apiRoutes = require('./api')

// const storage = multer.diskStorage({
//     destination: '../models/listing',
//     filename: (req, file, cb) => {
//         return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

module.exports = router;