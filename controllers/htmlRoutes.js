const { Order, User, Listing, Category } = require('../models')

const router = require('express').Router();

//homepage
router.get('/', async (req, res) => {
   try {

      const listingData = await Listing.findAll({
         include: Category,
         limit: 3,
         order: [['date_created', 'DESC']]
      });

      const listings = listingData.map((listing) => listing.get({ plain: true }));

      res.render('home', { listings })

   } catch (error) {
      console.log('trouble rendering all listings');
      res.status(500).json({ message: 'no listings showing' });
   }

});

router.get('/games', async (req, res) => {
   try {
      const gamesData = await Listing.findAll({
         include: Category,
         where: {
            category_id: 2
         }
      });
      const games = gamesData.map((game) => game.get({ plain: true }))
      console.log(games)
      res.render('games', { games })
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'no games showing' });
   }
});

router.get('/games/:id', async (req, res) => {
   try {

      const gamesData = await Listing.findOne({
         include: [User, Category],
         where: {
            id: req.params.id,
            category_id: 2
         }
      });
      //find a way to filter listing table so user cannot see literally any item despite being in wrong path (game or console)
      console.log('req.params.id:', req.params.id);
      console.log('type', typeof req.params.id);
      console.log('category_name:', req.params.category);
      console.log('type', typeof req.params.category);

      if (!gamesData) {
         return res.status(404).json({ message: 'Game not found' });
      }

      const games = gamesData.get({ plain: true })
 
      res.render('oneGame', {
         ...games
      })
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'single game is not showing' });
   }
});

router.get('/consoles', async (req, res) => {

   try {
      const consolesData = await Listing.findAll({
         include: Category,
         where: {
            category_id: 1
         }
      });
      const consoleListings = consolesData.map((individualConsole) => individualConsole.get({ plain: true }));

      res.render('consoles', { consoleListings });
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'list of consoles is not showing' });
   }
});


router.get('/consoles/:id', async (req, res) => {
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

      const item = itemsData.get({ plain: true })

      res.render('oneConsole', {
         ...item
      })
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'single console is not showing' });
   }
}
);

module.exports = router;

