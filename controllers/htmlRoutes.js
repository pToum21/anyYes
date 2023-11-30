const { Order, User, Listing, Category } = require('../models')

const router = require('express').Router();

//homepage
router.get('/', async (req, res) => {
   try {

      const listingData = await Listing.findAll();

      const listings = listingData.map((listing) => listing.get({ plain: true }));

      res.render('home', { listings })

   } catch (error) {
      console.log('trouble rendering all listings');
      res.status(500).json({ message: 'no listings showing' })
   }

})

module.exports = router;

