const router = require('express').Router();
const { Listing } = require('../../models');
const multer =require('multer')

//multer setup
const storage = multer.memoryStorage();
const upload = multer({
    storage,
})

//multer route
router.post('/file-upload', upload.single('image'),(req, res) => {
    console.log(req.file) //req.file.buffer is what we store
    console.log(req.body.title)
    res.end();
})

// posts the listing
router.post('/', async (req, res) => {
    try {
        const listingData = await Listing.create({
            ...req.body,
            user_id: req.session.user_id
        })
        res.status(200).json(listingData);
    } catch (error) {
        res.status(500).json(error.message)
    }
})


module.exports = router;