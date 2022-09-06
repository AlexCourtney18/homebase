const router = require('express').Router();
const sequelize = require('../config/connection');
const { Bill, Chore, Grocery, Group, Member, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    //console.log(req.session, "SESSION LOG HERE");
    //console.log(req.session.user_id, "SESSION USER ID HERE");
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
            //console.log(dbGroupData.joined_group);
            //console.log(dbGroupData.groups);
            const myGroup = dbGroupData.groups.map(melon => melon.get({ plain: true }));
            const groups = dbGroupData.joined_group.map(group => group.get({ plain: true }));
            // console.log(groups);
            res.render('homepage', { groups, myGroup, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
