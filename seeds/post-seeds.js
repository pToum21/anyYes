const { Post } = require('../models')

const postData = [
    {
        title: 'The Legend of Zeleda for the NES',
        description: ' Compelete in box, The Legend of Zeleda for the NES from 1987 ',
        date_created: 'Novemeber 2, 2023',
        user_id: 1
    },
    {
        title: 'New Nintendo Switch For Sale',
        description: 'Brand new nintendo switch for sale, box included no ware and tear',
        date_created: 'August 3, 2023',
        user_id: 2
    },
    {
        title: 'Used Gameboy Advance SP',
        description: 'selling my used gamboy from when i was a kid, great condition, used but not in bad shape.  Box not included ',
        date_created: 'Septemeber 12, 2023',
        user_id: 3
    },
    {
        title: 'New Sealed Sega Genesis',
        description: 'New sega for sale, box never opened, still sealed, For collectors ',
        date_created: 'October 29, 2023',
        user_id: 4
    },
    {
        title: 'Sonic for the Sega Genesis',
        description: 'Used sonic game for the sega genesis, good condition but it is used. ',
        date_created: 'December 3, 2023',
        user_id: 5
    }
]

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
