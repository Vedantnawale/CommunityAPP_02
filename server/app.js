require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./router/authRouter');
const postRouter = require('./router/postRouter')
const cookieParser = require('cookie-parser');
const errorMiddleware  = require('./middleware/error.middleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Third party access karne ke liye
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))

app.use("/uploads", express.static("uploads"));

app.use(cookieParser());

console.log('CLIENT_URL:', process.env.CLIENT_URL);

app.use('/api/v1/user', authRouter);
app.use('/api/v1/post', postRouter);

app.use('/', (req, res) => {
    res.status(200).json({
        data: 'JWTauth User'
    })
})

app.use(errorMiddleware);

module.exports = app;