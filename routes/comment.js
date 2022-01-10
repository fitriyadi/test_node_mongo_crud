const express = require('express');
const {check} = require('express-validator');
const Comment = require('../controllers/comment');
const router = express.Router();
const validate = require('../middlewares/validate');

//index
router.get('/', Comment.index);

//save
router.post('/', [
    check('comment').not().isEmpty().withMessage('Comment is required'),
    check('articleid').not().isEmpty().withMessage('Id Article is required')
], validate, Comment.store);

//show id
router.get('/:id',  Comment.show);

//update
router.put('/:id',  Comment.update);

//delete
router.delete('/:id', Comment.destroy);

module.exports = router;

