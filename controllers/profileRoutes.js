//view user dashboard
//**add withauth back in after login page is made


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

      const myListings = userListings.map(u => u.get({ plain: true }));
      res.render('profile', {
         myListings,
         logged_in: req.session.logged_in
         // listings: user.Listings,
         // orders: user.Orders
         // add this back in after login page is made
         // logged_in: req.session.logged_in
      })

   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'User could not load.' });
   }
})

module.exports = router
