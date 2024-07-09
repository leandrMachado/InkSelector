require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();

// middlewares
app.use(require('body-parser').json());
app.use(
    require('cors')({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    })
);

// routes middleware
app.use('/', require('./routes/shared.route'));

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.status(200).sendFile(
            path.resolve(__dirname, 'client', 'build', 'index.html')
        );
    });
};

// error handling
app.use((req, res, next) => {
    const err = {};
    err.status = 404;
    err.message = { status: 404, message: "Oops this page doesn't exists" };
    next(err);
});

app.use((err, req, res, next) => {
    const { name, message, stack, status } = err;
    res.status(status).json(message);
})


module.exports = app;