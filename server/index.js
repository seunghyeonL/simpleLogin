const express = require('express');

const port = 8080;
const cors = require('cors');
const app = express();

const users = require('./routes/users')

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json());

app.use('/users', users);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});

module.exports = app;