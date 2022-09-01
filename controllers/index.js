const router = require('express').Router();

const apiRoutes = require('./api');
const landingRoutes = require('./landing-routes');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use('/api', apiRoutes);
router.use('/', landingRoutes);
router.use('/homepage', homeRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;