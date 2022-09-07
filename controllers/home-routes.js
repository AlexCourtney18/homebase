const router = require('express').Router();
const { Group, Member, User } = require('../models');

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
            let myGroup = dbGroupData.groups.map(base => base.get({ plain: true }));
            let groups = dbGroupData.joined_group.map(group => group.get({ plain: true }));
            res.render('homepage', { groups, myGroup, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;