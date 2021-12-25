const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const PORT = process.env.PORT || 2435;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

require('./controllers/index')(app);

app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
});