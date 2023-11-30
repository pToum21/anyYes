const { Order, User, Listing, Category } = require('../models')

const router = require('express').Router();

//homepage
router.get('/', async (req, res) => {
   try {

      const listingData = await Listing.findAll({
         include: Category,
         limit: 3,
         order: [['date_created','DESC']]
      });

      const listings = listingData.map((listing) => listing.get({ plain: true }));

      res.render('home', { listings })

   } catch (error) {
      console.log('trouble rendering all listings');
      res.status(500).json({ message: 'no listings showing' })
   }

})

router.get('/games', async (req, res) => {
   try {
      const gamesData = await Listing.findAll({
         
         include: Category,
         where: {
            category_id: 2
         }
         
      })
      
      const games = gamesData.map((game) => game.get({ plain: true }))
      console.log(games)
      res.render('games', {games})
   } catch (error) {
      console.log(error)
   }
})

router.get('/games/:id', async (req, res) => {
   console.log('hello')
   try {
      
      const gamesData = await Listing.findByPk(req.params.id, {
         include: User,
      })
      console.log(gamesData)
      const games = gamesData.get({ plain: true})
      console.log(games)
      res.render('game', {
         ...games
      })
   } catch (error) {
      console.log(error)
   }
})

module.exports = router;

