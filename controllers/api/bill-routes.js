const router = require('express').Router();
const { Bill, Group, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Bill.findAll({
        attributes: [
            'id',
            'company',
            'amount_due',
            'due_date',
            'status',
        ],
        include: [
            {
                model: Group,
                attributes: ['id', 'group_name', 'address'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbBillData => res.json(dbBillData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}); //works

router.get('/:id', (req, res) => {
    Bill.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'company',
            'amount_due',
            'due_date',
            'status',
        ],
        include: [
            {
                model: Group,
                attributes: ['id', 'group_name', 'address'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbBillData => {
        if (!dbBillData) {
            res.status(404).json({ message: 'No bill found with this id' });
            return;
        }
        res.json(dbBillData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    //if (req.session) { //commented out seession data for now
        Bill.create({
            company: req.body.company,
            amount_due: req.body.amount_due,
            due_date: req.body.due_date,
            status: req.body.status,
            group_id: req.body.group_id
        })
            .then(dbBillData => res.json(dbBillData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    //}
});

router.put('/:id', (req, res) => {
    Bill.update(
        {
            company: req.body.company,
            amount_due: req.body.amount_due,
            due_date: req.body.due_date,
            status: req.body.status
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbBillData => {
        if (!dbBillData) {
            res.status(404).json({ message: 'No bill found with this id' });
            return;
        }
        res.json(dbBillData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}); //works

router.delete('/:id', (req, res) => {
    Bill.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbBillData => {
            if (!dbBillData) {
                res.status(404).json({ message: 'No bill found with this id' });
                return;
            }
            res.json(dbBillData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}); //works

module.exports = router;