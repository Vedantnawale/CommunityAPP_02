const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const postSchema = new mongoose.Schema({
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content:{
        type: String,
        required: true
    },
    postType: {
        type: String,
        enum: ['update', 'question'],
        default: 'update'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    comments:[commentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: [String],
    },
    updatedAt: {
        type: Date
    }
})

postSchema.pre('save', function (next){
    this.updatedAt = new Date();
    next();
})

module.exports = mongoose.model('Post', postSchema);