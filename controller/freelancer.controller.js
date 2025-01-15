const Freelancer = require("../models/Freelancer")
const errorHandler = require("../helpers/errorHandler")
const { freelancerValidation } = require("../validations/freelancer.validation")
const bcrypt = require("bcrypt")
const jwt = require("../service/jwt.service")
const uuid = require("uuid")
const mailService = require("../service/mail.service")
const config = require("config")

const createFreelancer = async (req, res) => {
    try {
        const {
            email,
        } = req.body
        const oldFrelancer = await Freelancer.findOne({ where: { email } })

        if (oldFrelancer?.dataValues) {
            return res.status(400).send({ message: "bu email bilan oldin ro'yxatdan o'tilgan" })
        }

        const { error, value } = freelancerValidation(req.body)

        if (error) {
            errorHandler(error, res)
        }

        const hashedPassword = bcrypt.hashSync(value.password, 7)
        const activation_link = uuid.v4()

        const newFreelancer = Freelancer.build({ ...value, password: hashedPassword, activation_link })

        await mailService.sendMailActivationCode(newFreelancer.email,
            `${config.get("api_url")}/api/freelancer/activate/${activation_link}`
        );

        const payload = {
            id: newFreelancer.id,
            name: newFreelancer.name,
            email: newFreelancer.email,
            role: "freelancer"
        }

        const token = jwt.generateTokens(payload)

        newFreelancer.refresh_token = token.refreshToken

        console.log(newFreelancer);

        await newFreelancer.save()

        return res.status(201).send({newFreelancer,accessToken : token.accessToken})

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

        if (!freelancers?.dataValues) {
            return res.status(400).send({ message: "freelancer topilmadi" })
        }

        return res.status(200).send(freelancers)

    } catch (error) {
        errorHandler(error, res)
    }
}


const updateFreelancer = async (req, res) => {
    try {

        const id = req.params.id

        const freelancer = await Freelancer.update({ ...req.body }, { where: { id } })

        if (!freelancer?.dataValues) {
            return res.status(204).send({ message: "freelancer topilmadi" })
        }

        return res.status(200).send(freelancer)

    } catch (error) {
        errorHandler(error, res)
    }
}


const deleteFreelancer = async (req, res) => {
    try {

        const id = req.params.id

        await Freelancer.destroy({ where: { id } })

        return res.status(200).send({ message: "deleted" })

    } catch (error) {
        errorHandler(error, res)
    }
}

const activateFreelancer = async (req, res) => {
    try {
        const link = req.params.link

        const freelancer = await Freelancer.findOne({where : {activation_link:link}})

        if(!freelancer?.dataValues){
            return res.status(400).send({message : "freelancer not found"})
        }
        if(freelancer.dataValues.is_acive){
            return res.status(400).send({message : "freelancer alread activation"})
        }

        freelancer.is_active = true
        await freelancer.save()

        return res.status(200).send({message : "freelancer active", is_active : freelancer.is_active})

    } catch (error) {
        errorHandler(error, res)
    }
}


module.exports = {
    createFreelancer,
    updateFreelancer,
    getFreelancers,
    getFreelancerById,
    deleteFreelancer,
    activateFreelancer
}