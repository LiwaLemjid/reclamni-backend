const users = require('./routes/users');
const publications = require('./routes/publications');
const mongoose = require('mongoose');
const config = require('config');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

if(!config.get('UserToken')){
    console.error('FATAL ERROR: User Token is not defined!');
    process.exit(1);
}

mongoose.connect('mongodb://localhost:27017/reclamer')
.then(()=>console.log('Connected to MongoDB..'))
.catch(err=>console.error('Could not connect to MongoDB...'));


app.use(express.json());

app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/publications',publications);



app.listen(3000, () => {
    console.log('Listening on localhost:3000')
  })