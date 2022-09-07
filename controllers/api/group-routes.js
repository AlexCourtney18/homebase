const router = require('express').Router();
const { Group, User, Bill, Member, Chore } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Group.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbGroupData => res.json(dbGroupData))
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
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Bill,
                attributes: ['id', 'company', 'amount_due', 'due_date', 'status' ]
            },
            {
                model: Chore,
                attributes: ['chore_name']
            }
        ]
    })
    .then(dbGroupData => {
        if (!dbGroupData) {
            res.status(404).json({ message: 'No group found with this id!' });
            return;
        }
        const plainGroup = dbGroupData.get({ plain: true })
        plainGroup.sessuser = req.session.user_id
        res.json(plainGroup);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {

    if (req.session) {
        Group.create({
            group_name: req.body.group_name,
            address: req.body.address,
            user_id: req.session.user_id
        })
        .then(dbGroupData => res.json(dbGroupData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

router.put('/memberadd', withAuth, (req, res) => {
    Member.create({
        user_id: req.session.user_id,
        group_id: req.body.group_id
    })
    .then(dbGroupData => res.json(dbGroupData))
    .catch(err => res.json(err));
});

router.put('/:id', (req, res) => {
    Group.update(
        {
            group_name: req.body.group_name,
            address: req.body.address
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbGroupData => {
        if (!dbGroupData) {
            res.status(404).json({ message: 'No group found with this id!' });
            return;
        }
        res.json(dbGroupData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



router.delete('/:id', (req, res) => {
    Group.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbGroupData => {
        if (!dbGroupData) {
            res.status(404).json({ message: 'No group found with this id!' });
            return;
        }
        res.json(dbGroupData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;