const express = require('express');
const app = express();
require('dotenv').config();

const admin = require('./routes/admin');
const Meet = require('./routes/meet');
app.use(express.json());

app.use('/admin', admin);
app.use('/meet', Meet);
app.listen(`${process.env.PORT}`, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
