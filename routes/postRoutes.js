const express = require('express');
const postController = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', postController.getAllPosts);

router.post('/', protect, postController.createPost);

router.get('/:id', postController.getOnePost);

router.patch('/:id', protect, postController.updatePost);

router.delete('/:id', postController.deletePost);

module.exports = router;