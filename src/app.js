const express = require('express');
const morgan = require('morgan');

/* const session = require('express-session'); // almacenan datos en la memoria del servidor
const MySQLStore = require('express-mysql-session'); // almacenar datos del servidor en la base de datos */
const passport = require('passport');

/* const database = require('./database/database'); */

// ========= INITIALIZATIONS =========
const app = express();
require('./config/passport');

// ========= SETTINGS =========
app.set('port', process.env.PORT || 3000);

// ========= MIDDLEWARES =========
/* app.use(session({
    secret: 'favoriteLinksNode',
    resave: 'false',
    saveUninitialized: 'false',
    store: new MySQLStore(database)
})); */

app.use(morgan('dev'));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// ========= GLOBAL VARIABLES =========

// ========= ROUTES =========
app.use('/api', require('./routes/app'));
app.use('/api/users', require('./routes/users'));
app.use('/api/links', require('./routes/links'));

// ========= PUBLIC =========

// ========= STARTING SERVER =========
app.listen(app.get('port'), () => {
    console.log('=> Server on port: ' + app.get('port'));
});