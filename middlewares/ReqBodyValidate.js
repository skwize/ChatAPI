module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") next()

    try {
        if(Object.keys(req.body).length === 0){
            next({
                status: 400,
                initiator: "Request",
                message: "Request body is empty"
            })
        }
        next()
    } catch (error) {
        next(error)
    }
}