const express = require("express"); // import express
const mongoose = require('mongoose');
const User = require("./Users");


const server = express(); // initialized express
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

server.get("/users", async (req, res, next) => {
    try {
        const users = await User.find();


        res.status(200).json({
            OK: true,
            message: "Users fetched",
            data: { users }
        })
    } catch (err) {
        console.log("Error", err)
    }
})

server.get("/users/:id", async (req, res, next) => {

    const user = await User.findById(req.params.id);

    res.status(200).json({
        OK: true,
        message: "Users fetched",
        data: user
    })
})

server.delete("/users/:id", async (req, res, next) => {

    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        OK: true,
        message: "Users deleted",
        data: user
    })
})

server.post("/users", async (req, res) => {

    try {
        console.log("I was called in POST", req.body)

        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });

        res.status(201).json({
            OK: true,
            message: "User created",
            data: user,

        })
    } catch (err) {
        res.status(500).json({
            OK: true,
            message: "Internal Server Error",
            data: err,

        })
    }
})