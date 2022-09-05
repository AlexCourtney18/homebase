const router = require('express').Router();
const sequelize = require('../config/connection');
const { Bill, Chore, Grocery, Group, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/:id', withAuth, (req, res) => {
    Group.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'group_name',
            'address',
            'user_id'
        ],
        include: [
            {
                model: Bill,
                attributes: ['id', 'company', 'amount_due', 'due_date', 'status', 'group_id']
            },
            {
                model: Chore,
                attributes: ['id', 'chore_name']
            },
            {
                model: Grocery,
                attributes: ['id', 'grocery_name']
            }
        ]
    })
    .then(dbGroupData => {
        // console.log('CAKE', dbGroupData.bills, dbGroupData.chores, dbGroupData.groceries);
        const group = dbGroupData.get({ plain: true });
        console.log(group);

        res.render('dashboard', {
            group,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;