const errorHandler = require("../helpers/errorHandler");

module.exports = async function (req, res, next) {
    try {

        const id = req.params.id
        if(id != req.freelancer.id){
            return res.status(400).send({message : "sizda bunday huquq yo'q"})
        }

        next()

    } catch (error) {
        console.log(error);
        errorHandler(error, res)
    }
};