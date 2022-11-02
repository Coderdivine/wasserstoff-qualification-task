const jwt = require("jsonwebtoken");
async function Header(req, res, next) {
    const auth = req.headers["authorization"];
    const token = auth && auth.split(" ")[1];
    if (token == null) return res.sendStatus(404).end();
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