require('dotenv').config()
const express = require('express');
const db = require('./db/mongoose');
const cookieParser = require('cookie-parser');
const port = 8000;

const app = express();

app.use(express.json());
app.use(cookieParser());



app.use('/', require('./routes'));


app.listen(port, ()=> {
    console.log(`Server is running on port:${port}`);
})