const userModel = require("../model/userSchema");
const logger = require('../utilis/logger.js')


const bcrypt = require('bcrypt');

const { default: AppError } = require("../utilis/error.util");
// const upload = require("../middleware/multer.middleware");

// const cookieOptions = {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "Lax",
//     maxAge: 24 * 60 * 60 * 1000,

// }




exports.signup = async (req, res, next) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        logger.warn('Signup failed: Missing fields');
        return next(new AppError('All fields are required', 400)); // isko capture karo or aage bhej do
    }

    const userExists = await userModel.findOne({ email });

    if (userExists) {
        logger.warn(`Signup failed: Email already exists - ${email}`);
        return next(new AppError('Email is already exists', 400))
    }

    const user = await userModel.create({
        fullName,
        email,
        password,
    })

    if (!user) {
        logger.warn(`User registration failed, please try again`);
        return next(new AppError('User registration failed, please try again', 400));
    }


    await user.save();

    user.password = undefined;

    //const token = await user.jwtToken();

    //res.cookie("jwt", token, cookieOptions);

    logger.info(`New user registered: ${email}`);

    res.status(200).json({
        success: true,
        message: 'User registered successfully',
    })

}

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        logger.warn('Signin failed: Missing credentials')
        return res.status(400).json({
            success: false,
            message: "All Fields Are Required"
        })
    }
    try {
        const user = await userModel.findOne({ email }).select('+password') // yachyat email sobt fkt password aala pahije mhnun

        if (!user || !(await bcrypt.compare(password, user.password))) {
            logger.warn(`Invalid login attempt for email: ${email}`);
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const token = await user.jwtToken();
        user.password = undefined;

        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000, // 24h
            httpOnly: true
        }

        res.cookie("jwt", token, cookieOption);

        logger.info(`User signed in: ${email}`);
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        logger.error('Signin error', error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

exports.getUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await userModel.findById(userId);
        logger.info(`Get User : ${user}`)
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        logger.error("Get User Error : ", error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.logout = (req, res) => {
    //console.log("Logout Called")
    try {
        const userEmail = req.user.email;
        const cookieOption = {
            expires: new Date(),
            httpOnly: true
        }
        res.cookie("jwt", null, cookieOption);
        logger.info(`Logout Called : ${userEmail}`);
        res.status(200).json({
            success: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        logger.error("Logout Error : ", error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.editUser = async (req, res) => {
    try {
        const { fullName, bio } = req.body;
        const skills = JSON.parse(req.body.skills || "[]");

        const socialLinks = {
            linkedin: req.body.linkedin || "",
            github: req.body.github || "",
        };

        const { id } = req.params;
        const user = await userModel.findById(id);

        if (!user) {
            logger.warn("User not found for updating");
            return res.status(400).json({ success: false, message: "User not found" });
        }

        user.fullName = fullName;
        user.bio = bio;
        user.skills = skills;
        user.socialLinks = socialLinks;

        if (req.file) {
            user.avatar = req.file.filename;
        }

        await user.save();

        logger.info(`User Updated : ${user}`);

        res.status(200).json({
            success: true,
            message: "Profile updated",
            user,
        });
    } catch (err) {
        logger.error("Update Error : ", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getDevelopers = async (req, res) => {
    //console.log("Get Users Called");
    try {
        const users = await userModel.find();
        if (!users) {
            logger.warn("No Developers Available")
            return res.status(500).json({
                success: false,
                message: "No Developers Available"
            })
        }
        res.status(200).json({
            success: true,
            message: "All Users",
            data: users
        })
    } catch (error) {
        logger.error("Cant Get Developers Error : ", error);
        res.status(500).json({
            success: true,
            message: error.message
        })
    }
}
