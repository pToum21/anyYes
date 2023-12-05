const { Order, User, Listing, Category } = require('../models')

const router = require('express').Router();

const withAuth = require('../utils/auth');

const { Op } = require('sequelize');


//homepage
router.get('/', async (req, res) => {
   try {
      console.log(req.query.q)
      const query = req.query.q ? {
         where: {
            title: {
               [Op.like]: `%${req.query.q}%`
            }
         },
         include: Category,
         order: [['date_created', 'DESC']]
      } : {
         include: Category,
         limit: 3,
         order: [['date_created', 'DESC']]
      }
      console.log(query)
      const listingData = await Listing.findAll(query);


      const listings = listingData.map((listing) => listing.get({ plain: true }));
console.log(listings)
      listings.forEach(listing => {
         if (listing.image) {
            listing.image = listing.image.toString('base64')
         } else {
            listing.image = null
         }
      })

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
});


//viewing listings of all games and consoles
router.get('/category/:category', async (req, res) => {
   try {
      let itemId;

      if (req.params.category === 'consoles') {
         itemId = 1;
         const itemData = await Listing.findAll({
            include: Category,
            where: {
               category_id: itemId
            }
         });
         const items = itemData.map((individualConsole) => individualConsole.get({ plain: true }));
         console.log('hello')

         items.forEach(listing => {
            if (listing.image) {
               listing.image = listing.image.toString('base64')
            } else {
               listing.image = null
            }
            console.log(items);
         })
         console.log('help')


         res.render('consoles', { items, logged_in: req.session.logged_in });

      } else if (req.params.category === 'games') {

         itemId = 2;
         const itemData = await Listing.findAll({
            include: Category,
            where: {
               category_id: itemId
            }
         });
         const items = itemData.map((individualConsole) => individualConsole.get({ plain: true }));

         items.forEach(listing => {
            if (listing.image) {
               listing.image = listing.image.toString('base64')
            } else {
               listing.image = null
            }
         })

         res.render('games', { items, logged_in: req.session.logged_in });

      } else {
         res.status(404).json({ message: 'no category of that nature exists.' });
      }

   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'List of consoles is not showing.' });
   }
});

//viewing listing of one game or console
router.get('/category/:category/:id', async (req, res) => {

   //this works fine, but may need to change it for RESTful practices

   try {
      let itemId = 1;
      if (req.params.category === 'game') {
         itemId = 2
      }
      const specificPage = req.params.category;
      const itemsData = await Listing.findOne({
         include: [User, Category],
         where: {
            id: req.params.id,
            category_id: itemId
         }
      });

      if (!itemsData) {
         return res.status(404).json({ message: 'console not found' });
      }

      const item = itemsData.get({ plain: true });

      res.render(`${specificPage}`, {
         ...item
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'This console does not exist.' });
   }
}
);

// **ryan: i think we can delete these route handlers since cart is handled by local storage
router.get('/cart', async (req, res) => {
   try {
      res.render('cart');
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'This cart does not exist.' });
   }
});

router.get('/searchResults', async (req, res) => {
   try {
      res.render('searchResults');
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'No results for this input' });
   }
});


module.exports = router;

