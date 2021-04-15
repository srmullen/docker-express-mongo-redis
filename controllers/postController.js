const Post = require('../models/postModel');

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.json({
      status: 'success',
      data: {
        posts
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail'
    });
  }
}

exports.getOnePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail'
    });
  }
}

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);

    res.json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail'
    });
  }
}

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail'
    });
  }
}

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail'
    });
  }
}

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.json({
      status: 'success'
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail'
    });
  }
}