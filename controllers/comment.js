const Comment = require('../models/comment');
const Article = require('../models/article');

// @route get api/comment
exports.index = async function (req, res) {
    const comments = await Comment.find({});
    res.status(200).json({comments});
};

exports.store = async (req, res) => {
    try {
        const newComment = new Comment({...req.body});
        const articleid = await Article.findById(req.body.articleid);
        if (!articleid) return res.status(401).json({message: 'Article does not exist'});

        const article = await newComment.save();

        res.status(200).json({article, message: 'Comment added successfully'});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

// @route GET api/comment/{id}
exports.show = async function (req, res) {
    try {
        const id = req.params.id;

        const comment = await Comment.findById(id);

        if (!comment) return res.status(401).json({message: 'Comment does not exist'});

        res.status(200).json({comment});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// @route PUT api/comment/{id}
exports.update = async function (req, res) {
    try {
        const update = req.body;
        const id = req.params.id;

        const comment = await Comment.findByIdAndUpdate(id, {$set: update}, {new: true});

        res.status(200).json({comment, message: 'Comment has been updated'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @route DESTROY api/comment/{id}
exports.destroy = async function (req, res) {
    try {
        const id = req.params.id;

        await Comment.findByIdAndDelete(id);

        res.status(200).json({message: 'Comment has been deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};