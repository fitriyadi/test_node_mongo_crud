const article = require('./article');
const comment = require('./comment');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Welcome to Home"});
    });
    
    app.use('/api/article', article);
    app.use('/api/comment', comment);
};