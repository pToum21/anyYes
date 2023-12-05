const router = require('express').Router();
const { Order, Listing } = require('../models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = 'http://localhost:3001';

router.get('/', async (req, res) => {
    try {
        const dbRes = await Listing.findOne({
            where: {
                title: req.query.name
            }
        });

        const listing = dbRes.get({ plain: true });

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
            success_url: `${YOUR_DOMAIN}/success.html`,
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        });

        res.redirect(303, session.url);

    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router;