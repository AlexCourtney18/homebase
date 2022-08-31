const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use(require('./controllers'));

db.sync({ force: false }).then(() => {
    app.listen(PORT);
    console.log(`listening on http://localhost:${PORT}`)
});