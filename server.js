require('dotenv').config();
const cors = require('cors');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

//* db connection
require('./src/db/dbConnection.js');

//* error handler
const errorHandler = require("./src/handlers/error");

//* Routes
const userRoute = require('./src/routes/user');
const tagsRoute = require('./src/routes/tags');


const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// passport config 
require('./src/config/passport')(passport)


app.use('/api/user', userRoute);
app.use('/api/tags', tagsRoute);
app.use(errorHandler);



app.listen(PORT, () => console.log(`Server: running on port ${PORT}`));