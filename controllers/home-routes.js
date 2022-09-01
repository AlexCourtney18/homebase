const router = require('express').Router();
const sequelize = require('../config/connection');
const { Bill, Chore, Grocery, Group, User } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage')
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})