const express = require('express');
const postRouter = express.Router();
const jwtAuth = require('../middleware/jwtAuth');
const { createPost, getAllPosts, getPostById, toggleLike, addComment, deleteComment, deletePostByAdmin, editPost } = require('../controller/postController');

postRouter.post('/', jwtAuth, createPost);
postRouter.get('/posts', getAllPosts);
postRouter.get('/:id',  getPostById);
postRouter.post('/like/:id', jwtAuth, toggleLike);
postRouter.delete("/admin/delete-post/:userId/:postId", jwtAuth, deletePostByAdmin);
postRouter.post('/comment/:id', jwtAuth, addComment);
postRouter.delete('/comment/:postId/:commentId', jwtAuth, deleteComment);
postRouter.put('/edit-post/:postId', jwtAuth, editPost)



module.exports = postRouter;