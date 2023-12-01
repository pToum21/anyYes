const { Order, User, Listing } = require('../models')
const router = require('express').Router();
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
        const order = orderData.get({ plain: true });
        res.render('orders', {
            ...order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error finding Orders' });
    }
}
);