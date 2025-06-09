const app = require('./app.js');
const connectToDb = require('./config/db.js');
require('dotenv').config();

const PORT = process.env.PORT || 3500;

app.listen(PORT, async () => {
    await connectToDb();
    console.log(`Server is running On Localhost : ${PORT}`);
})

