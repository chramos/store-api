const express = require('express');
const morgan = require('morgan');

const app = express();

require('./plugins');

app.set('port', process.env.PORT || 5000);

app.use(morgan('dev'));

app.use(express.json());

app.use('/api', require('./routes'));

app.listen(app.get('port'));