const { Order } = require('../models')

const orderData = [
    {
        id: 1,
        status: true,
        reference_number: 2230,
        created_at: 'january 4, 2023',
        address: '1234 doorknob way',
        listing_id: 1,
        user_id: 2
    },
    {
        id: 2,
        status: false,
        reference_number: 1130,
        created_at: 'march 2, 2022',
        address: '7822 ventura blvd',
        listing_id: 2,
        user_id: 4
    }


];

const seedOrder = () => {
   return Order.bulkCreate(orderData)
};

module.exports = seedOrder;