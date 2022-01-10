const express = require('express');
const {check} = require('express-validator');
const Article = require('../controllers/article');
const router = express.Router();
const validate = require('../middlewares/validate');

//index
router.get('/', Article.index);

//save
router.post('/', [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('description').not().isEmpty().withMessage('Description is required')
], validate, Article.store);

//show id
router.get('/:id',  Article.show);

//show Comment per id
router.get('/:id/comment',  Article.showcomment);

//update
router.put('/:id',  Article.update);

//delete
router.delete('/:id', Article.destroy);

module.exports = router;

