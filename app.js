const express = require("express"); // import express

const server = express(); // initialized express

server.listen(9000, () => {
    console.log("App is listening on port 9000")
})

server.use(express.json())

server.get("/", (req, res, next) => {
    console.log("I was called in GET")
    res.status(200).json({
        OK: true,
        message: "Server is up and running"
    })
})

server.post("/user", (req, res) => {
    console.log("I was called in POST",req.body)

    res.status(200).json({
        OK: true,
        message: "The data u sent is below",
        data: req.body,

    })

})