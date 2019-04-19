const express = require('express');
const morgan = require('morgan');

// ========= INITIALIZATIONS =========
const app = express();

// ========= SETTINGS =========
app.set('port', process.env.PORT || 3000);

// ========= MIDDLEWARES =========
app.use(morgan('dev'));

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
app.use('/api/links', require('./routes/links'));

// ========= PUBLIC =========

// ========= STARTING SERVER =========
app.listen(app.get('port'), () => {
    console.log('=> Server on port: ' + app.get('port'));
});