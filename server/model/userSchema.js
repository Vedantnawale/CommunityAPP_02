const mongoose = require('mongoose');
const { Schema } = mongoose;
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'user name is required'],
        minLength: [4, 'Name must be at least 5 char'],
        maxLength: [50, 'Name must be less than 50'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'user email is required'],
        unique: [true, 'email already registered'],
        lowercase: true,
    },
    password: {
        type: String,
        select: false, // isse password by default nahi milega need to call manually
        minLength: [8, 'Name must be at least 8 char'],
        maxLength: [16, 'Name must be less than 16 char'],
    },
    bio: {
        type: String,
        default: '',
    },
    skills: {
        type: [String],
        default: []
    },
    avatar: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        //enum: ['User', 'Admin'],
        default: 'User'
    },

    socialLinks: {
        linkedin: {
            type: String,
            default: '',
        },
        github: {
            type: String,
            default: '',
        },
    },

    forgotPasswordToken: {
        type: String
    },
    forgotPasswordExpiryDate: {
        type: Date
    }
}, {
    timestamps: true
})

userSchema.methods = {
    jwtToken: async function () {
        return JWT.sign(
            { id: this._id, email: this.email }, // payload
            process.env.SECRET, // secret
            { expiresIn: '24h' } //  time duaration
        )
    }
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
    return next();
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel