const router = require('express').Router();
const { Grocery, Group } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Grocery.findAll({
        include: [
            {
                model: Group,
                attributes: ['id', 'group_name', 'address'],
            }
        ]
    })
        .then(dbGroceryData => res.json(dbGroceryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
<<<<<<< HEAD
});
=======
}); //works
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7

router.get('/:id', (req, res) => {
    Grocery.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Group,
                attributes: ['id', 'group_name', 'address'],
            }
        ]
    })
    .then(dbGroceryData => {
        if (!dbGroceryData) {
            res.status(404).json({ message: 'No grocery item found with this id' });
            return;
        }
        res.json(dbGroceryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
<<<<<<< HEAD
});

router.post('/', (req, res) => {
    Grocery.create({
        Grocery_name: req.body.grocery_name,
=======
}); //works

router.post('/', (req, res) => {
    Grocery.create({
        grocery_name: req.body.grocery_name,
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7
        group_id: req.body.group_id
    })
    .then(dbGroceryData => res.json(dbGroceryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
<<<<<<< HEAD
}); 
=======
}); //works
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7

router.put('/:id', (req, res) => {
    Grocery.update(
        {
<<<<<<< HEAD
            Grocery_name: req.body.grocery_name,
=======
            grocery_name: req.body.grocery_name,
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7
            group_id: req.body.group_id
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbGroceryData => {
        if (!dbGroceryData) {
            res.status(404).json({ message: 'No Grocery found with this id!' });
            return;
        }
        res.json(dbGroceryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
<<<<<<< HEAD
}); 
=======
}); //works
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7

router.delete('/:id', (req, res) => {
    Grocery.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbGroceryData => {
        if (!dbGroceryData) {
            res.status(404).json({ message: 'No Grocery found with this id!' });
            return;
        }
        res.json(dbGroceryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
<<<<<<< HEAD
}); 
=======
}); //works
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7


module.exports = router;