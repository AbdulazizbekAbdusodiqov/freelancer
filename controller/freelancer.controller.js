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


const getFreelancers = async (req, res) => {
    try {
        
        const freelancers = await Freelancer.findAll()
        
        return res.status(200).send(freelancers)
        
    } catch (error) {
        errorHandler(error, res)
    }
}


const getFreelancerById = async (req, res) => {
    try {
        
        const freelancers = await Freelancer.findByPk(req.params.id)
        
        if(!freelancers?.dataValues){
            return res.status(400).send({message : "freelancer topilmadi"})
        }
        
        return res.status(200).send(freelancers)

    } catch (error) {
        errorHandler(error, res)
    }
}


const updateFreelancer = async (req, res) => {
    try {
        
        const id = req.params.id

        const freelancer = await Freelancer.update({...req.body},{where : {id}})
        
        if(!freelancer?.dataValues){
            return res.status(204).send({message : "freelancer topilmadi"})
        }
        
        return res.status(200).send(freelancer)

    } catch (error) {
        errorHandler(error, res)
    }
}


const deleteFreelancer = async (req, res) => {
    try {
        
        const id = req.params.id

        await Freelancer.destroy({where : {id}})
        
        return res.status(200).send({message :"deleted"})

    } catch (error) {
        errorHandler(error, res)
    }
}


module.exports = {
    createFreelancer,
    updateFreelancer,
    getFreelancers,
    getFreelancerById,
    deleteFreelancer
}