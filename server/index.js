require('dotenv').config();
const express = require('express');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const fileupload = require('express-fileupload');
const path = require('path');

const sequelize = require('./db');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileupload({})); // image download
app.use('/api', router);
app.use(errorHandler); // middleware for error handling

app.get('/', function(req, res) {
    res.status(200).json({
        message: "Fine!"
    })
    // res.send('qwerty') sets the content type to text/Html
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log('Hello!'));
    } catch(err) {
        console.log(err);
    }
}

start();