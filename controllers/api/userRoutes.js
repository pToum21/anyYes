//require the router method of express so we dont have to bring in the entirety of express each time.
const router = require('express').Router();
// import the User model
const { User } = require('../../models');

// sign up new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            res.status(200).json(newUser);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'could not create user' });
    }
});

// log in user
router.post('/login', async (req, res) => {
    try {
        const userLogin = User.findOne(
            {
                where: {
                    email: req.body.email
                }
            });

        //check if user exists
        if (!userLogin) {
            res.status(404).json({ message: 'login failed' });
            return;
        };

        //if pw is wrong
        const pw = await userLogin.checkPassword(req.body.password)
        if (!pw) {
            res.status(404).json({ message: 'login failed' });
            return;
        };


        req.session.save(() => {
            req.session.user_id = userLogin.id;
            req.session.logged_in = true;

            res.status(200).json({ message: 'user logged in' });
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'login failed' });
    }
});

//logout
router.post('/logout', async (req, res) => {
   try {
    if (req.session.logged_in) {
        //destroys user session
        req.session.destroy(() => {
            //placed in a function to ensure session is destroyed first
            res.status(204).end()
        });
    }
    else {
        res.status(404).end()
    }
   } catch (error) {
    console.log('logout failed')
    res.status(400).end()
   }   
});

module.exports = router;