const jwt = require("jsonwebtoken");
require("dotenv").config();// I required all local environment variables. 
async function Header(req, res, next) {
     //This function is used to authenticate requests.
     //If requests is Validated, next function will be called
     //else we would send a 404 response to the user 
    const auth = req.headers["authorization"];// get the bearer token 
    const token = auth && auth.split(" ")[1];//we would use the split function to separate the token from the word 'bearer'
    const random = process.env.JWT
    const create = jwt.sign({ token }, random, {
        expiresIn: 1000*3,
    })//this function creates a random JWT token
     console.log(create);//view in console for reference 
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

module.exports = {Header};// I exported the header Function 
