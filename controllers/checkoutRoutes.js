const router = require('express').Router();
const { Order, Listing } = require('../models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const withAuth = require('../utils/auth')

// if MODE exists, it'll be on local host, otherwise heroku
const YOUR_DOMAIN = process.env.MODE ? 'http://localhost:3001' : 'https://anyyes-3bf9b8d1cf29.herokuapp.com';

router.get('/', async (req, res) => {
    try {
        const dbRes = await Listing.findOne({
            where: {
                title: req.query.name
            }
        });


        const listing = dbRes.get({ plain: true });

        // 4242424242424242 this is the card number to enter to test
        // an future date for exp date works
        // an 3 digit for cvc works
        // use any full name and zipcode
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price_data: {
                        currency: 'USD',

                        unit_amount: Math.round(listing.price * 100),
                        product_data: {
                            name: req.query.name,
                            description: listing.description,
                        }

                    },
                    quantity: 1
                },
            ],
            mode: 'payment',
            // goes to success page, but then immediately redirects to profile and orders
            success_url: `${YOUR_DOMAIN}/checkout/success?listing_id=${listing.id}`,
            cancel_url: `${YOUR_DOMAIN}/checkout/cancel`,
        });

        res.redirect(303, session.url);
        // fix
    } catch (error) {
        res.status(400).json(error);
    }
});


router.get('/success', withAuth, async (req, res) => {
    const listing_id = req.query.listing_id
    const user_id = req.session.user_id
    try {
        const updateItem = await Listing.update({
            sold: true
        }, {
            where: {
                id: listing_id,

            }
        });
        const listing = await Listing.findOne({
            where: { id: listing_id },
        });

        const dbRes = await Order.create({
            user_id: user_id,
            listing_id: listing_id
        })

        const order = dbRes.get({ plain: true });

        res.redirect('/profile#order-section');
    } catch (error) {

        res.status(500).json({ message: 'This cart does not exist.' });
    }
});

router.get('/cancel', async (req, res) => {
    try {
        res.render('cancelcheckout', { logged_in: req.session.logged_in });
    } catch (error) {

        res.status(500).json({ message: 'This cart does not exist.' });
    }
});



module.exports = router;