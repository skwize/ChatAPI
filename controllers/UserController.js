const User = require("../models/UserModel")

module.exports = {
    getData: async (req, res, next) => {
        try {
            return res.send(await User.findById(req.user.id))
        } catch (err) {
            next(err)
        }
    }
}