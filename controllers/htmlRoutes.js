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
});


//viewing listings of all games and consoles
router.get('/category/:category', async (req, res) => {

   try {
      let itemId = 1;
      if(req.params.category === 'games') {
         itemId = 2
      }
      const specificPage = req.params.category;
      const itemData = await Listing.findAll({
         include: Category,
         where: {
            category_id: itemId
         }
      });
      const items = itemData.map((individualConsole) => individualConsole.get({ plain: true }));

      res.render(`${specificPage}`, { items, logged_in: req.session.logged_in });
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'List of consoles is not showing.' });
   }
});

//viewing listing of one game or console
router.get('/:category/:id', async (req, res) => {
   try {
      let itemId = 1;
      if(req.params.category === 'game'){
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

router.post('/cart', async (req, res) => {
   try {
      // const { title, description, date_created, game_name, console_name, console_brand, year, condition, price, color, is_special_edition, image, category_id, user_id } = req.body;

        const cartItem = await Listing.findOne({ where: {
            id: req.session.id
        }
        });
        console.log('Created cart item:', cartItem)

        res.render('cart', {
            cartItem, 
        });
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'This cart does not exist.' });
   }
})




module.exports = router;

