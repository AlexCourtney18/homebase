const withAuth = (req, res, next) => {
    if (!req.session.group_name) {
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = withAuth;