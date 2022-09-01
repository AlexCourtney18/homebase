const router = require('express').Router();
const sequelize = require('../config/connection');
const { Bill, Chore, Grocery, Group } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Group.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'group_name',
            'address'
        ]
    })
        .then(dbGroupData => {
            const groups = dbGroupData.map(group => group.get({ plain: true }));
            res.render('homepage', { groups, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/dashboard/:id', withAuth, (req, res) => {
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
        const group = dbGroupData.get({ plain: true });

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