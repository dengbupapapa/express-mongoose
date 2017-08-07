// const app = require('./app.js');
'use strict';
import app from './app.js';

app.set('port', 8081);
app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port'));
});