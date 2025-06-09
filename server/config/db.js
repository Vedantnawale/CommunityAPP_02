const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const MONGO_URI = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/JWT`

const connectToDb = async (req, res) => {
    mongoose.connect(MONGO_URI)
    .then((conn)=> {
        console.log(`Connected to DB ${conn.connection.host}`);
    })
    .catch((err) => {
        console.log(err.message);
    })
}

module.exports = connectToDb;