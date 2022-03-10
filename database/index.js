const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODBCONNECTION)
.then(() => {
    console.log("Successful connection with MongoDB");
}).catch((err) => {
    console.log('Error: Connection to MongoDB not successful');
});

mongoose.Promise = global.Promise;

module.exports = mongoose;