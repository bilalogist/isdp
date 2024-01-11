const User = require("../Users");

const getUser = async (req, res, next) => {
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
}

const getUserById = async (req, res, next) => {

    const user = await User.findById(req.params.id);

    res.status(200).json({
        OK: true,
        message: "Users fetched",
        data: user
    })
}

module.exports = {
    getUser, getUserById
}