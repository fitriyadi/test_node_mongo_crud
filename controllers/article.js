const Article = require('../models/article');
const mongoose = require('mongoose');

const limit_ = 5;

// @route get api/article
exports.index = async function (req, res) {
    
    let aggregate_options = [];
    let search = !!(req.query.title);
    let match_regex = {$regex: req.query.title, $options: 'i'}; // serach incensitive
    
    //Pagination Set..
    const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || limit_,
        collation: {locale: 'en'},
        customLabels: {
            totalDocs: 'totalResults',
            docs: 'article'
        }
    };

    //Serach with title
    if (search) aggregate_options.push({$match: {"title": match_regex}});

    //Sort by
    let sort_order = req.query.sort_order && req.query.sort_order === 'asc' ? 1 : -1;
    let sort_by = req.query.sort_by || "date";
    aggregate_options.push({
        $sort: {
            [sort_by]: sort_order,
            "_id": -1
        },
    });

    aggregate_options.push({
        $project: {
            _id: 1,
            title: 1,
            description: 1,
            date: 1
        }
    });

    const myAggregate = Article.aggregate(aggregate_options);
    const result = await Article.aggregatePaginate(myAggregate, options);
    res.status(200).json(result);
};


// @route POST api/article
exports.store = async (req, res) => {
    try {
        const newArticle = new Article({...req.body});

        const article = await newArticle.save();

        res.status(200).json({article, message: 'Article added successfully'});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

// @route GET api/Article/{id}
exports.show = async function (req, res) {
    try {
        const id = req.params.id;
        const article = await Article.findById(id);

        if (!article) return res.status(401).json({message: 'Article does not exist'});

        res.status(200).json({article});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// @route GET api/Article/{id}/comment
exports.showcomment = async function (req, res) {
    const id = req.params.id;    
    console.log(id)
    Article.aggregate([
            {
              $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "articleid",
                as: "comment_info",
              },
            },
            {
                $match: { "_id": mongoose.Types.ObjectId(id) } 
            },
            {
              $unwind: "$comment_info",
            },
          ])
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                res.status(500).json({message: error.message});
            });
};

// @route PUT api/Article/{id}
exports.update = async function (req, res) {
    try {
        const update = req.body;
        const id = req.params.id;

        const article = await Article.findByIdAndUpdate(id, {$set: update}, {new: true});

        res.status(200).json({article, message: 'Article has been updated'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @route DESTROY api/Article/{id}
exports.destroy = async function (req, res) {
    try {
        const id = req.params.id;

        await Article.findByIdAndDelete(id);

        res.status(200).json({message: 'Article has been deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};