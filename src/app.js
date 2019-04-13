const express = require('express');
const morgan = require('morgan');

// ========= INITIALIZATIONS =========
const app = express();

// ========= SETTINGS =========
app.set('port', process.env.PORT || 3000);

// ========= MIDDLEWARES =========
app.use(morgan('dev'));

// ========= GLOBAL VARIABLES =========

// ========= ROUTES =========
app.use('/api', require('./routes/app'));
app.use('/api/links', require('./routes/links'));

// ========= PUBLIC =========

// ========= STARTING SERVER =========
app.listen(app.get('port'), () => {
    console.log('=> Server on port: ' + app.get('port'));
});