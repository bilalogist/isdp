const express = require("express");
const userController = require("./controllers/userController")
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res, next) => {
    //check if there is a token within the request
    // and it is a valid token
    // Bearer ahbdjflehrglerashoqijn23n5rjhsbdflj
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            // "Bearer token123142" => ["Bearer","token123142"]
            const splitedToken = authHeader.split(" ");

            const token = splitedToken[1]; //token123142

            const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (data) {
                next();
            }

        } else {
            // Explicitly throwing error 
            // if token not found
            throw new Error("Token not found");
        }

    } catch (err) {
       
        return res.json({
            message: err.message,
            err: err
        })
    }


}, userController.getUser)

module.exports = router;