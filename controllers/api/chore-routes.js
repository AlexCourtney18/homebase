const router = require('express').Router();
const { Chore, Group } = require('../../models');

router.get('/', (req, res) => {
    Chore.findAll({
        include: [
            {
                model: Group,
                attributes: ['id', 'group_name', 'address'],
            }
        ]
    })
        .then(dbChoreData => res.json(dbChoreData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Chore.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Group,
                attributes: ['id', 'group_name', 'address'],
            }
        ]
    })
    .then(dbChoreData => {
        if (!dbChoreData) {
            res.status(404).json({ message: 'No chore found with this id' });
            return;
        }
        res.json(dbChoreData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Chore.create({
        chore_name: req.body.chore_name,
        group_id: req.body.group_id
    })
    .then(dbChoreData => res.json(dbChoreData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Chore.update(
        {
            chore_name: req.body.chore_name,
            group_id: req.body.group_id
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbChoreData => {
        if (!dbChoreData) {
            res.status(404).json({ message: 'No chore found with this id!' });
            return;
        }
        res.json(dbChoreData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Chore.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbChoreData => {
        if (!dbChoreData) {
            res.status(404).json({ message: 'No chore found with this id!' });
            return;
        }
        res.json(dbChoreData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}); 

module.exports = router;

