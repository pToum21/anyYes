const router = require('express').Router();
const { Listing } = require('../../models');
const multer = require('multer')

//multer setup
const storage = multer.memoryStorage();
const upload = multer({
    storage,
})

//multer route
router.post('/file-upload', upload.single('image'), async (req, res) => {
    try {
        // console.log(req)
        const fileBuffer = req.file.buffer;
        const { title, price,
            description,
            date_created,
            game_name,
            console_name,
            console_brand,
            year,
            condition,
            color,
            is_special_edition,
            category_id,
            user_id } = req.body;
        console.log(title, console_brand)

        const newListing = await Listing.create({
            title,
            image: fileBuffer,
            price,
            description,
            date_created,
            game_name,
            console_name,
            console_brand,
            year,
            condition,
            price,
            color,
            is_special_edition,
            category_id,
            user_id

        });

        res.status(200).json({ listing: newListing })
        res.end()
    } catch (error) {
        
        res.status(500).json(error.message)
    }
  
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