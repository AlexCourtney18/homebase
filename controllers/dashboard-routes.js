const router = require('express').Router();
const sequelize = require('../config/connection');
const { Bill, Chore, Grocery, Group, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/:id', (req, res) => {
    Bill.findAll({
        where: {
            group_id: req.params.id
        },
        attributes: [
            'id',
            'company',
            'amount_due',
            'due_date',
            'status'
        ]
    })
    .then(dbBillData => {
        const bills = dbBillData.map(bill => bill.get({ plain: true }));
        res.render('dashboard', { bills });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Chore.findAll({
        where: {
            group_id: req.params.id
        },
        attributes: [
            'id',
            'chore_name' 
        ]
    })
    .then(dbChoreData => {
        const chores = dbChoreData.map(chore => chore.get({ plain: true }));
        res.render('dashboard', { chores });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Grocery.findAll({
        where: {
            group_id: req.params.id
        },
        attributes: [
            'id',
            'grocery_name' 
        ]
    })
    .then(dbGroceryData => {
        const groceries = dbGroceryData.map(grocery => grocery.get({ plain: true }));
        res.render('dashboard', { groceries });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;