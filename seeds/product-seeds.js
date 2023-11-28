const { Product } = require('../models');

const productData = [
    {
        id: 1,
        game_name: 'The Legend of Zelda',
        console_name:'Nintendo Entertainment System',
        console_brand:'Nintendo',
        year: 1987,
        condition: 'CIB',
        price: 145.73,
        color: 'Gold',
        is_special_edition: true,
        user_id: 1,
        category_id: 2
    },
    {
        id: 2,
        game_name: 'N/A',
        console_name:'Nintendo Switch',
        console_brand:'Nintendo',
        year: 2023,
        condition: "Sealed",
        price: 299.99,
        color: 'black',
        is_special_edition: false,
        user_id: 2,
        category_id: 1
    },
    {
        id:3,
        game_name: 'N/A',
        console_name:'Gameboy Advance SP',
        console_brand:'Nintendo',
        year: 2003,
        condition: 'Used',
        price: 79.99,
        color: 'blue',
        is_special_edition: false,
        user_id: 3,
        category_id: 1
    },
    {
        id: 4,
        game_name: 'N/A',
        console_name:'Sega Genesis',
        console_brand:'Sega',
        year:1989,
        condition:'Sealed',
        price: 710,
        color: 'black',
        is_special_edition: false,
        user_id: 4,
        category_id: 1
    },
    {
        id: 5,
        game_name: 'Sonic the Hedgehog',
        console_name:'Sega Genesis',
        console_brand: 'Sega',
        year: 1991,
        condition: 'used',
        price: 12.93,
        color: 'black',
        is_special_edition: false,
        user_id: 2,
        category_id: 2
    }
]

const seedProduct = () => Product.bulkCreate(productData);

module.exports = seedProduct;