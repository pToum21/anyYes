//view user dashboard
//**add withauth back in after login page is made


const { Order, User, Listing, Category } = require('../models')

const router = require('express').Router();

const withAuth = require('../utils/auth');

router.get('/:user_name', async (req, res) => {
   try {

      const userData = await Listing.findAll({
         where: {
            user_id: req.session.user_id
         },
         include: [User, Order]
      });

      if (!userData) {
         return res.status(404).json({ message: 'Oh, no! User does not exist!' })
      };

      const users = userData.map(u => u.get({ plain: true }));
      console.log(users);
      res.render('profile', {
         users,
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
