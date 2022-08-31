const router = require('express').Router();
const { Grocery, Group, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Grocery.findAll({
        attributes: [
            'id',
            'grocery_name'
        ],
        include: [
            {
                model: Group,
                attributes: ['id', 'grou_name', 'address'],
            }
        ]
    })
})