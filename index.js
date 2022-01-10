require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Setting url database
const connUri = process.env.DATABASE;
let PORT =process.env.PORT || 3000;

//Create App
const app = express();
//Set Cors
app.use(cors());

// for parsing application/json
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
//form-urlencoded


//set up database
mongoose.promise = global.Promise;
mongoose.connect(connUri);

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB connect!'));
connection.on('error', (err) => {
    console.log("MongoDB connection error..." + err);
    process.exit();
});

//Set Route
require('./routes/index')(app);

//=== 5 - START SERVER
app.listen(PORT, () => console.log('Server running on http://localhost:'+PORT+'/'));
