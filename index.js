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

mongoose.connect('mongodb://liwa:liwa54838108@ds051577.mlab.com:51577/reclamer')
.then(()=>console.log('Connected to MongoDB..'))
.catch(err=>console.error('Could not connect to MongoDB...'));


app.use(express.json());

app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/publications',publications);


//const port = process.env.PORT || 3000;
app.listen( ()=> console.log(`Listening on port ...`));