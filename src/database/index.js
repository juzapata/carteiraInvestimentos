const mongoose = require('mongoose');
require('dotenv/config');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.MONGO_URL, options).then(() => {
    console.log('Connected to the database...');
}).catch(err => console.log(err));
mongoose.Promise = global.Promise;

module.exports = mongoose; 