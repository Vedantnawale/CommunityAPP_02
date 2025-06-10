const Post = require("../model/postSchema");
const userModel = require("../model/userSchema");

exports.createPost = async (req, res) => {
    try {
        const { content, postType, tags } = req.body;

        //const { id } = req.params;

        const post = new Post({
            author: req.user.id,
            content,
            postType,
            tags
        });

        await post.save();
        res.status(200).json({
            success: true,
            message: "Post Created Successfully",
            post
        })

        await post.save();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author')
            .populate('comments.user');

        //console.log("Fetched Posts:", posts.length);
        //    console.log(posts);
        res.status(200).json({
            success: true,
            //message: "All Posts Fetch Successfully",
            posts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name email')
            .populate('comments.user', 'name email');

        if (!post) {
            return res.status(500).json({
                success: false,
                message: "Post Not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Post Fetched",
            post
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deletePostByAdmin = async (req, res) => {
    try {
        const { userId, postId } = req.params;

        // Check if user exists and is admin
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        // Check if post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        console.log("User ID : ", user._id.toString());
        console.log("Author ID : ", post?.author?._id.toString());


        if (user.role !== 'Admin' && user._id.toString() !== post?.author?._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Only admin or the author can delete posts",
            });
        }



        console.log("deleted called")
        // Delete the post
        await Post.findByIdAndDelete(postId);

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.toggleLike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(500).json({
                success: false,
                message: "Post Not Found"
            })
        }

        const userId = req.user.id;

        const index = post.likes.indexOf(userId);

        if (index === -1) {
            post.likes.push(userId);
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Post Liked"
            })
        } else {
            post.likes.splice(index, 1);
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Post Unliked"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // console.log(req.params.id)
        if (!post) return res.status(404).json({ success: false, message: "Post not found" });

        const newComment = {
            user: req.user.id,
            text: req.body.text,
        };

        post.comments.push(newComment);
        await post.save();

        await post.populate("comments.user");

        res.status(200).json({
            success: true,
            message: "Comment added",
            comment: post.comments[post.comments.length - 1],
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const comment = post.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        // Allow deletion only by comment owner and post owner
        if ((comment.user.toString() !== userId) && (userId !== post?.author?._id.toString())) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        post.comments = post.comments.filter(
            (c) => c._id.toString() !== commentId
        )
        console.log(post.comments)
        await post.save();

        res.status(200).json({ success: true, message: "Comment deleted", commentId });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.editPost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        const post = await Post.findById(postId).populate("author");
        if (!post) {
            return res.status(404).json({ success: false, message: "Post Not Found" });
        }

        if (post?.author?._id.toString() !== userId) {
            return res.status(403).json({ success: false, message: "You can't edit this post" });
        }

        const { content } = req.body;
        if (content) {
            post.content = content;
            post.updatedAt = Date.now();
        }

        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post Updated Successfully",
            post,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

