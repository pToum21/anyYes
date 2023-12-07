//require the router method of express so we dont have to bring in the entirety of express each time.
const router = require('express').Router();
// import the User model
const { User } = require('../../models');

// router.get('/check-expiration', (req, res) => {

//     if (req.session.cookie._expires) {
//         // Check if the session expiration time is in the past
//         const isExpired = new Date(req.session.cookie._expires) < new Date();

//         if (isExpired) {
//             // Session has expired
//             res.json('session expired');
//         } else {
//             // Session is still valid
//             res.json('session valid');
//         }
//     } else {
//         // Session does not have an expiration time
//         res.json('Session does not have an expiration time.');
//     }
// });


// sign up new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            // could user req.session.username(can be anything but make sure it doesnt match db column name) = newUser.user_name

            res.status(200).json(newUser);
        });
    } catch (error) {
        res.status(500).json({ message: 'could not create user' });
    }
});

// log in user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } })

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password' })
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'incorrect email or password' })
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id,
                req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'You are logged in' })
        })
    } catch (err) {

        res.status(400).json(err.message)
    }
})

//logout
router.post('/logout', async (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            })
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(400).json(err)
    }
})



module.exports = router;