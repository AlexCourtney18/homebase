const router = require('express').Router();

router.get('/', (req, res) => {
    console.log("LOGIN PAGE", req.session);
    if (req.session.loggedIn) {
        res.redirect('/homepage');
        return;
    }

    res.render('login');
});


module.exports = router;