const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./controllers');
<<<<<<< HEAD
=======
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.DBSECRET,
    cookie: {
        //logic for session timeout if wanted
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7

const app = express();
const PORT = process.env.PORT || 3001;

<<<<<<< HEAD
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
=======
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session(sess));
>>>>>>> feab44b193b164e291d9feea95d642a0a8f9e9c7

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT);
    console.log(`listening on http://localhost:${PORT}`)
});