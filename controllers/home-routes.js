const router = require('express').Router();
const sequelize = require('../config/connection');
const { Bill, Chore, Grocery, Group, Member, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
        },
        attributes: [
            'id',
            'username',
            'email'
        ],
        include: [
            {
                model: Group,
                attributes: ['id', 'group_name', 'address']
            },
            {
                model: Group,
                attributes: ['id', 'group_name', 'address'],
                through: Member,
                as: 'joined_group'
            }
        ]
    })
        .then(dbGroupData => {
            let myGroup = dbGroupData.groups.map(melon => melon.get({ plain: true }));
            let groups = dbGroupData.joined_group.map(group => group.get({ plain: true }));
            res.render('homepage', { groups, myGroup, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Group.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'group_name',
            'address'
        ]
    })
        .then(dbGroupData => {
            // const myGroup = dbGroupData.groups.map(melon => melon.get({ plain: true }));
            const cherry = dbGroupData.get({ plain: true });
            console.log(cherry, 'BARBEQUE');
            res.render('homepage', { cherry, loggedIn: true });
            //res.json(cherry);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;