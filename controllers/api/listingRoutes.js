const router = require('express').Router();
const { Listing } = require('../../models');

// posts the listing
router.post('/', async (req, res) => {
    try {
        const listingData = await Listing.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(listingData);
    } catch (error) {
        res.status(500).json(error.message)
    }
})


module.exports = router;