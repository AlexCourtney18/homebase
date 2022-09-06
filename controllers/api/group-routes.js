const router = require('express').Router();
const { Group, User, Bill, Member, Chore, Grocery } = require('../../models');
const sequelize = require('../../config/connection');
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
}); //works

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
                attributes: ['username']
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
        
        const group = dbGroupData.get({ plain: true })
        //console.log(group)
        res.render('homepage', group);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}); //works

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
}); //works

//Added here to attempt to associate groups and members
router.put('/memberadd', withAuth, (req, res) => {
    Member.create({
        user_id: req.body.user_id,
        group_id: req.body.group_id
    })
    .then(dbGroupData => res.json(dbGroupData))
    .catch(err => res.json(err));
});

router.put('/:id', (req, res) => {
    Group.update(
        {
            group_name: req.body.group_name,
            address: req.body.address,
            //password: req.body.password
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
}); //works



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