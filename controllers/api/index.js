const router = require('express').Router();

const userRoutes = require('./user-routes');
const billRoutes = require('./bill-routes');
const choreRoutes = require('./chore-routes');
const groceryRoutes = require('./grocery-routes');
const groupRoutes = require('./group-routes');

router.use('/users', userRoutes);
router.use('/bills', billRoutes);
router.use('/chores', choreRoutes);
router.use('/groceries', groceryRoutes);
router.use('/groups', groupRoutes);



module.exports = router;