const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        console.log(token);
        console.log("Inside token undefined error");
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
    let tokenValue = token.split(" ")[1]; 
    jwt.verify(tokenValue, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log("Inside jwt error", err);
            return res.status(401).json({
                success: false,
                message: "Token Expired",
            });
        } else {
            req.user = decoded;
            next();
        }
    });
};