

const express = require('express');
const expFileUp = require('express-fileupload');

require('dotenv').config();

const { PORT, DB_MONGO, InternalServerError } = require('./config/conf.js');
const { adminRouter, authRouter, userRouter, pestRouter } = require('./router');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(DB_MONGO);

app.use(expFileUp());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/superAdmin', adminRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/pest', pestRouter);


app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log(`Port ${PORT} working...`)
});


function _mainErrorHandler(err, req, res, next) {
    res.status(err.status || InternalServerError).json({
        message: err.message || 'Unknown Error'
    })
}


