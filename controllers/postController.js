const e = require('express');
const Post = require('../models/postModel');

exports.getAllPosts = async (req, res) => {

    try{
        const posts = await Post.find();
        return res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts,
            },
        });
    }
    catch(err){
        return res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};


exports.getOnePost = async (req, res) => {

    try{
        const post = await Post.findById(req.params.id);
        return res.status(200).json({
            status: 'success',
            data: {
                post,
            },
        });
    }
    catch(err){
        return res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.createPost = async (req, res) => {

    try{
        const newPost = await Post.create(req.body);
        return res.status(201).json({
            status: 'success',
            data: {
                post: newPost,
            },
        });
    }
    catch(err){
        return res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.updatePost = async (req, res) => {

    try{
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        return res.status(200).json({
            status: 'success',
            data: {
                post,
            },
        });
    }
    catch(err){
        return res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.deletePost = async (req, res) => {

    try{
        await Post.findByIdAndDelete(req.params.id);
        return res.status(204).json({
            status: 'success',
            data: null,
        });
    }
    catch(err){
        return res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
}

