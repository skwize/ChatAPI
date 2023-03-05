module.exports = (err, req, res, next) => {

    res.status(err.status || 500)
    res.send({
        errorInitiator: err.initiator || "",
        message: err.message || "Internal server Error"
    })
    next()
}