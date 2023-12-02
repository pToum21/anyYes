const { Order, User, Listing, Category } = require('../models')

const router = require('express').Router();

const withAuth = require('../utils/auth');



//homepage
router.get('/', async (req, res) => {
   try {

      const listingData = await Listing.findAll({
         include: Category,
         limit: 3,
         order: [['date_created', 'DESC']]
      });

      const listings = listingData.map((listing) => listing.get({ plain: true }));

      res.render('home', { listings, logged_in: req.session.logged_in });

   } catch (error) {
      console.log('trouble rendering all listings');
      res.status(500).json({ message: 'No listings showing.' });
   }

});

//login
router.get('/login', async (req, res) => {
   if (req.session.logged_in) {
      res.redirect('/')
      return;
   }
   res.render('login')
})

//viewing listings of all games
router.get('/games', async (req, res) => {
   try {
      const gamesData = await Listing.findAll({
         include: Category,
         where: {
            category_id: 2
         }
      });
      const games = gamesData.map((game) => game.get({ plain: true }));
      res.render('games', {
         games,
         logged_in: req.session.logged_in
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'No games showing.' });
   }
});

//viewing one game listing
router.get('/game/:id', async (req, res) => {
   try {

      const gamesData = await Listing.findOne({
         include: [User, Category],
         where: {
            id: req.params.id,
            category_id: 2
         }
      });

      if (!gamesData) {
         return res.status(404).json({ message: 'Game not found.' });
      }

      const games = gamesData.get({ plain: true });

      res.render('oneGame', {
         ...games
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'This game does not exist.' });
   }
});

//viewing listings of all consoles
router.get('/consoles', async (req, res) => {

   try {
      const consolesData = await Listing.findAll({
         include: Category,
         where: {
            category_id: 1
         }
      });
      const consoleListings = consolesData.map((individualConsole) => individualConsole.get({ plain: true }));

      res.render('consoles', { consoleListings, logged_in: req.session.logged_in });
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'List of consoles is not showing.' });
   }
});

//viewing listing of one console
router.get('/console/:id', async (req, res) => {
   try {

      const itemsData = await Listing.findOne({
         include: [User, Category],
         where: {
            id: req.params.id,
            category_id: 1
         }
      });

      if (!itemsData) {
         return res.status(404).json({ message: 'console not found' });
      }

      const item = itemsData.get({ plain: true });

      res.render('oneConsole', {
         ...item
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'This console does not exist.' });
   }
}
);

//cart
router.get('/cart/:id', async (req, res) => {
   try {
      const cartData = await Listing.findByPk(req.params.id)

      if (!cartData) {
         return res.status(404).json({ message: 'cart not found' });
      }

      const cart = cartData.get({ plain: true })

      res.render('cart', {
         ...cart
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'This cart does not exist.' });
   }
})





module.exports = router;

