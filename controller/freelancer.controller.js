const Freelancer = require("../models/Freelancer")
const errorHandler = require("../helpers/errorHandler")
const {freelancerValidation} = require("../validations/freelancer.validation")


const createFreelancer = async (req, res) => {
    try {
        const {
            email,
        } = req.body
        const oldFrelancer = await Freelancer.findOne({ where: { email } })

        if(oldFrelancer?.dataValues){
            return res.status(400).send({message : "bu email bilan oldin ro'yxatdan o'tilgan"})
        }

        const {error, value} = freelancerValidation(req.body)

        if(error){
            errorHandler(error, res)
        }

        const newFreelancer =  Freelancer.build(value)

        console.log(newFreelancer);
        

        return res.send(newFreelancer)

    } catch (error) {
        errorHandler(error, res)
    }
}



module.exports = {
    createFreelancer
}