const Freelancer = require("../models/Freelancer")
const errorHandler = require("../helpers/errorHandler")
const {freelancerValidation} = require("../validations/freelancer.validation")
const bcrypt = require("bcrypt")
const jwt = require("../service/jwt.service")

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

        const hashedPassword = bcrypt.hashSync(value.password, 7)
        const newFreelancer =  Freelancer.build({...value, password : hashedPassword})

        const payload = {
            id: newFreelancer.id,
            name : newFreelancer.name,
            email : newFreelancer.email,
            role : "freelancer"
        }

        const token = jwt.generateTokens(payload)
        
        newFreelancer.refresh_token = token.refreshToken

        console.log(newFreelancer);
        
        await newFreelancer.save()

        return res.send(newFreelancer)

    } catch (error) {
        errorHandler(error, res)
    }
}



module.exports = {
    createFreelancer
}