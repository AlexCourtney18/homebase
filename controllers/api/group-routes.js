const router = require('express').Router();
const { Group } = require('../../models');
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

router.post('/', (req, res) => {
    Group.create({
        group_name: req.body.group_name,
        address: req.body.address,
        password: req.body.password
    })
    .then(dbGroupData => res.json(dbGroupData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Group.update(
        {
            group_name: req.body.group_name,
            address: req.body.address,
            password: req.body.password
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