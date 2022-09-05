const router = require('express').Router();
const { User, Bill, Group, Chore } = require('../../models');
<<<<<<< HEAD
=======
const withAuth = require('../../utils/auth');
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}); //works

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Group,
                attributes: ['id', 'group_name', 'address'],
                include: [
                    {
                        model: Bill,
<<<<<<< HEAD
                        attributes: ['id', 'company', 'amount_due', 'due_date', 'status' ]
=======
                        attributes: ['id', 'company', 'amount_due', 'due_date', 'status']
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7
                    },
                    {
                        model: Chore,
                        attributes: ['chore_name']
                    }
                ]
            }
        ]
    }) 
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}); //works

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
<<<<<<< HEAD
        password: req.body.password,
    })
    .then(dbUserData => {
        // req.session.save(() => {
        //     req.session.user_id = dbUserData.id;
        //     req.session.username = dbUserData.username;
        //     req.session.loggedIn = true;
=======
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7

            res.json(dbUserData);
        });
    })
<<<<<<< HEAD
//}); //works. Will need to uncomment this line and the session data for sessions
=======
}); //works. Will need to uncomment this line and the session data for sessions
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
<<<<<<< HEAD
=======
            console.log("FAIL TRUTHY TEST"); 
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);
<<<<<<< HEAD
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
=======
        console.log(req.body.password, "PASSWORD VALUE!!!!");
        console.log(validPassword, "VALID PASSWORD????");
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            console.log("FAIL PASSWORD VALIDATION");
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
}); //no test

router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}); //works

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}); //works

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
}); //no test


module.exports = router;