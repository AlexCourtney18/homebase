const router = require('express').Router();
const sequelize = require('../config/connection');
const { Bill, Chore, Grocery, Group } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Group.findAll({
        // where: {
        //     user_id: req.session.user_id
        // },
        attributes: [
            'id',
            'group_name',
            'address'
        ]
    })
        .then(dbGroupData => {
            console.log(dbGroupData);
            const groups = dbGroupData.map(group => group.get({ plain: true }));
            res.render('homepage', { groups, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
