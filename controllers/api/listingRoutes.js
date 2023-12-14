const router = require('express').Router();
const { Listing } = require('../../models');
const multer = require('multer');

//multer setup
const storage = multer.memoryStorage();
const upload = multer({
    storage,
})

//multer route
router.post('/file-upload', upload.single('image'), async (req, res) => {
    try {
        const fileBuffer = req.file.buffer;
        const {
            title,
            price,
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
            user_id
        } = req.body;

        // use sharp to resize and convert file buffer; make sure it returns a buffer as well (lines 33-51 into the .then of sharp)

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
            color,
            is_special_edition,
            category_id,
            user_id: req.session.user_id
        });

        res.status(200).json({ listing: newListing });
        res.end();
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const listingId = req.params.id;


        // Assuming you have a method like 'findByPk' on your Listing model
        const foundListing = await Listing.findByPk(listingId);

        if (!foundListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        const currentUser = req.session.user_id;
        console.log(currentUser);

        // Send the image buffer along with other listing details
        res.status(200).json({
            listing: {
                id: foundListing.id,
                title: foundListing.title,
                price: foundListing.price,
                description: foundListing.description,
                date_created: foundListing.date_created,
                game_name: foundListing.game_name,
                console_name: foundListing.console_name,
                console_brand: foundListing.console_brand,
                year: foundListing.year,
                condition: foundListing.condition,
                color: foundListing.color,
                is_special_edition: foundListing.is_special_edition,
                category_id: foundListing.category_id,
                user_id: foundListing.user_id,
                image: foundListing.image ? foundListing.image.toString('base64') : null,
                currentUser
            }
        });
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
});

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
});

module.exports = router;