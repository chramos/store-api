const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/homestead', {useNewUrlParser: true})

const db = mongoose.connection

db.once('open', () => {
    console.log('MongoDB database connected')
}).on('error', (err) => {
    console.log(err)
});

module.exports= mongoose