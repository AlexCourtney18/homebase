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
});

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
});

router.post('/', (req, res) => {
    Grocery.create({
        grocery_name: req.body.grocery_name,
        group_id: req.body.group_id
    })
    .then(dbGroceryData => res.json(dbGroceryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}); 

router.put('/:id', (req, res) => {
    Grocery.update(
        {
            Grocery_name: req.body.grocery_name,
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
}); 

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
}); 


module.exports = router;