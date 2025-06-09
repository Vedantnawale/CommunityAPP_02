const JWT = require('jsonwebtoken')

const jwtAuth = (req, res, next) => {
    const token = req.cookies?.jwt;
     //console.log("JWT token from cookie:", token);
    

    if(!token){
        return res.status(400).json({
            success: false,
            message: 'Not Authorized'
        })
    }

    try {
        const payload = JWT.verify(token, process.env.SECRET);
        //console.log(payload);
        req.user = {id: payload.id, email: payload.email}
    } catch (error) {
         return res.status(400).json({
            success: false,
            message: error.message
        })
    }
    next(); // this help us to go from one process to another at one time
}

module.exports = jwtAuth;