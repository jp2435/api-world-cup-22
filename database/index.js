const mongoose = require('mongoose');
const authConfig = require('../config/auth');

mongoose.connect(authConfig.mongodbConnection)
.then(() => {
    console.log("Successful connection with MongoDB");
}).catch((err) => {
    console.log('Error: Connection to MongoDB not successful');
});

mongoose.Promise = global.Promise;

module.exports = mongoose;