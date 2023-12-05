
const { Order } = require('../../models');
const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        const orderData = await Order.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(orderData);
    } catch (error) {
        res.status(500).json(error.message)
    }
});

module.exports = router;