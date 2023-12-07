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
         include: [User, Order],
         order: [['date_created', 'DESC']]
      });

      if (!userListings) {
         return res.status(404).json({ message: 'Oh, no! User does not exist!' })
      };

      let myListings = userListings.map(u => u.get({ plain: true }));

      // console.log(myListings);

      //if statement to render listings for user in profile, but if no listings exist, can still show user_name

      if (myListings.length > 0) {
         //turns image base 64
         myListings.forEach(listing => {
            if (listing.image) {
               listing.image = listing.image.toString('base64')
            } else {
               listing.image = null
            }
         });

         const userName = myListings[0].user.user_name;
         const orderData = await Order.findAll({
            where: {
               user_id: req.session.user_id
            },
            include: [Listing]
         })

         // console.log('Order data:', orderData);


         let myOrders = orderData.map(u => u.get({ plain: true }));
         console.log('These are my orders:', myOrders);

         //if there is a listing, we will render myListings and userName to profile.hbs
         res.render('profile', { myListings, userName, myOrders, logged_in: req.session.logged_in });

      } else {
         const user = await User.findByPk(req.session.user_id);
         const userName = user.user_name

         // console.log(userName)
         // if no listing, pass empty array for myListings, userName will show
         res.render('profile', { myListings: [], userName, myOrders:[], logged_in: req.session.logged_in })
      }
   } catch (error) {
      console.log(error);
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

router.delete('/:id', withAuth, async (req, res) => {
   try {
      // Find the listing by ID
      const listingData = await Listing.findByPk(req.params.id);

      // If the listing doesn't exist or doesn't belong to the current user, return a 404 error
      if (!listingData || listingData.user_id !== req.session.user_id) {
         return res.status(404).json({ message: 'Listing not found or you do not have permission to delete it.' });
      }

      // Delete the listing
      await listingData.destroy();

      res.status(200).json({ message: 'Listing deleted successfully.' });
   } catch (error) {
      res.status(500).json({ message: 'Error deleting listing.' });
   }
});

module.exports = router
