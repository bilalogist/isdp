const express = require("express"); // import express
const mongoose = require('mongoose');
const User = require("./Users");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken")
const server = express(); // initialized express

// Import routes here
const userRoutes = require("./userRoutes");
// import userRoutes from "./userRoutes"

// Connection URL
mongoose.connect("mongodb://127.0.0.1:27017/test").then(() => {
    console.log('Connected to MongoDB');

}).catch(e => {
    console.log('Error', e)
});



server.listen(9000, () => {
    console.log("App is listening on port 9000")
})

server.use(express.json())

// move all the requests to userRouter
server.use("/users", userRoutes)

// server.get("/users", async (req, res, next) => {
//     try {
//         const users = await User.find();


//         res.status(200).json({
//             OK: true,
//             message: "Users fetched",
//             data: { users }
//         })
//     } catch (err) {
//         console.log("Error", err)
//     }
// })

// server.get("/users/:id", async (req, res, next) => {

//     const user = await User.findById(req.params.id);

//     res.status(200).json({
//         OK: true,
//         message: "Users fetched",
//         data: user
//     })
// })

// server.delete("/users/:id", async (req, res, next) => {

//     const user = await User.findByIdAndDelete(req.params.id);

//     res.status(200).json({
//         OK: true,
//         message: "Users deleted",
//         data: user
//     })
// })

// server.post("/users", async (req, res) => {

//     try {
//         console.log("I was called in POST", req.body)

//         const hashedPassword = bcrypt.hashSync(req.body.password, 10);

//         const user = await User.create({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             email: req.body.email,
//             password: hashedPassword
//         });

//         const { password, ...rest } = user.toJSON();

//         res.status(201).json({
//             OK: true,
//             message: "User created",
//             data: rest,

//         })
//     } catch (err) {
//         res.status(500).json({
//             OK: true,
//             message: "Internal Server Error",
//             data: err,

//         })
//     }
// })



server.post("/login", async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email
        })


        if (user) {

            const isCorrect = bcrypt.compareSync(req.body.password, user.password);

            if (isCorrect) {
                const token = jwt.sign({
                    id: user._id,
                    email: user.email
                }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "5h",
                });

                return res.status(200).json({
                    OK: true,
                    message: "You are logged in",
                    token: token

                })
            } else {
                res.status(500).json({
                    OK: true,
                    message: "You are NOTTTTTTT logged in",

                })
            }

        } else {
            res.status(404).json({
                OK: false,
                message: "Email or password incorrect"
            })
        }

    } catch (err) {
        console.log(err)
        res.status(404).json({
            OK: false,
            message: "Email or password incorrect",
            error: err
        })

    }



})
// server.get("/verify", verifyToken);


// function verifyToken(req, res, next) {
//     console.log("Called")
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];
//     console.log(token)
//     if (token == null) {
//         return res.status(404).json({
//             OK: false,
//             message: "FORBIDDEN",
//         })
//     }
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
//         if (err) {
//             return res.status(404).json({
//                 OK: false,
//                 message: "FORBIDDEN",
//                 err
//             });
//         }
//         return res.status(200).json({
//             OK: false,
//             message: "Verified",
//             payload,
//         })
//         // next();
//     });
// }

// const loginwithtoken = async (req, res, next) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     try {
//         const user = await UserSchema.findOne({ email: email });
//         const match = await bcrypt.compare(password, user.password);
//         if (match) {
//             const accessToken = createToken(email);
//             apiResponse(res, { accessToken }, false, "Logged In", "OK");
//         } else { apiResponse(res, null, true, "InValid Password", "FORBIDDEN"); }
//     } catch (err) {

//         apiResponse(res, { err }, true, "Something went wrong", "FORBIDDEN");
//     }


// };

const createToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });
};
