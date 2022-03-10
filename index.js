require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const PORT = process.env.PORT || 2435;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

require('./controllers/index')(app);

app.use((req, res, next) => {
    const erro = new Error('Route not found');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: {
            message: error.message
        }
    })
});

app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
});