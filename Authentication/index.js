const jwt = require("jsonwebtoken");
require("dotenv").config();
async function Header(req, res, next) {
    const auth = req.headers["authorization"];
    const token = auth && auth.split(" ")[1];
    const random = process.env.JWT
    const create = jwt.sign({ token }, random, {
        expiresIn: 1000*3,
    })
     console.log(create);
    if (token == null) return res.sendStatus(404);
    jwt.verify(token, process.env.JWT, (err, result) => {
        if (err) {
            return res.sendStatus(404);
        } else {
            if (process.env.JWT == result) {
                next()
            } else {
                console.log("invalid token")
                res.sendStatus(404);
            }
        }

    })

}

module.exports = {Header};