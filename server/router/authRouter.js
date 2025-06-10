const express = require('express');
const { signup, signin, getUser, logout, editUser, getDevelopers } = require('../controller/authController');
const jwtAuth = require('../middleware/jwtAuth');
const upload  = require('../middleware/multer.middleware');
const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.get('/user', jwtAuth, getUser);
authRouter.get('/developers', getDevelopers);
authRouter.get('/logout', jwtAuth, logout);
authRouter.put('/update/:id', upload.single('avatar'), jwtAuth, editUser);

module.exports = authRouter;