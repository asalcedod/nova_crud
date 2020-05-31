const mongoose = require('mongoose')
const URI = 'mongodb://heroku_s68mzq5z:sefb6gl1n7h9pt3ijqbeve08p9@ds035014.mlab.com:35014/heroku_s68mzq5z'
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))

module.exports = mongoose