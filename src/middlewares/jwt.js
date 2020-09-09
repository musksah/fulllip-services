const jwt = require('jsonwebtoken');

module.exports.checkJwt = (req, res, next) => {
    const token = req.headers['auth'];
    if (auth) {
        console.log(token);
        res.json(token);
    } else {
        console.log(token);
        res.json("no hay token");
    }
    // try {
    //     console.log("buenas");
    //     res.setHeader('token', req.params);
    //     next();
    // } catch (error) {
    //     throw error;
    // }
} 