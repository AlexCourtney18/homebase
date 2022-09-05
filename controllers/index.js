const router = require('express').Router();

const apiRoutes = require('./api');
<<<<<<< HEAD
//const homeRoutes = require('./home-routes');
//const dashboardRoutes = require('./dashboard-routes');

router.use('/api', apiRoutes);
//router.use('/', homeRoutes);
//router.use('/dashboard', dashboardRoutes);
=======
const landingRoutes = require('./landing-routes');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use('/api', apiRoutes);
router.use('/', landingRoutes);
router.use('/homepage', homeRoutes);
router.use('/dashboard', dashboardRoutes);
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7

module.exports = router;