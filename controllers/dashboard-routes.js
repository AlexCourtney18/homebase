const router = require('express').Router();
const { Bill, Chore, Grocery, Group } = require('../models');
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
        const bills = dbGroupData.bills.map(bill => bill.get({ plain: true }));
        const groceries = dbGroupData.groceries.map(group => group.get({ plain: true }));
        const groups = dbGroupData.get({ plain: true });
        const chores = dbGroupData.chores.map(chore => chore.get({ plain: true }));
        res.render('dashboard', {
            groceries,
            groups,
            bills,
            chores,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;