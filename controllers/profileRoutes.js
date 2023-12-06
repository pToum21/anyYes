//view user dashboard
const { Order, User, Listing, Category } = require('../models')

const router = require('express').Router();

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
   //use :user_name, + user_name: req.params.user_name
   try {

      const userListings = await Listing.findAll({
         where: {
            user_id: req.session.user_id
         },
         include: [User, Order]
      });

      if (!userListings) {
         return res.status(404).json({ message: 'Oh, no! User does not exist!' })
      };

      let myListings = userListings.map(u => u.get({ plain: true }));

      myListings.forEach(listing => {
         if (listing.image) {
            listing.image = listing.image.toString('base64')
         } else {
            listing.image = null
         }
      })

      res.render('profile', {
         myListings,
         logged_in: req.session.logged_in        
      })

   } catch (error) {
      
      res.status(500).json({ message: 'User could not load.' });
   }
});

router.get('/orders/:id', async (req, res) => {
   try {
      const orderData = await Order.findAll({

         where: {
            id: req.params.id,
            user_id: req.session.user_id
         },
         include: [User, Listing]
      });
      if (!orderData) {
         return res.status(404).json({ message: 'Orders Empty' });
      }
      const order = orderData.map((o) => o.get({ plain: true }));
      
      res.render('profile', {
         order, logged_in: req.session.logged_in
      });
   } catch (error) {
      
      res.status(500).json({ message: 'Error finding Orders' });
   }
}
);

module.exports = router
