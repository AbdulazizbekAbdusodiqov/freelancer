const Client = require("../models/Client")
const errorHandler = require("../helpers/errorHandler")
const {  clientValidation } = require("../validations/client.validation")
const bcrypt = require("bcrypt")
const jwt = require("../service/jwt.service")

const createClient = async (req, res) => {
    try {
        const {
            email,
        } = req.body
        const oldClient = await Client.findOne({ where: { email } })

        if (oldClient?.dataValues) {
            return res.status(400).send({ message: "bu email bilan oldin ro'yxatdan o'tilgan" })
        }

        const { error, value } = clientValidation(req.body)

        if (error) {
            errorHandler(error, res)
        }

        const hashedPassword = bcrypt.hashSync(value.password, 7)
        const newClient = Client.build({ ...value, password: hashedPassword })

        const payload = {
            id: newClient.id,
            name: newClient.name,
            email: newClient.email,
            role: "client"
        }

        const token = jwt.generateTokens(payload)

        newClient.refresh_token = token.refreshToken

        console.log(newClient);

        await newClient.save()

        return res.send({newClient, accessToken : token.accessToken})

    } catch (error) {
        errorHandler(error, res)
    }
}


const getClients = async (req, res) => {
    try {

        const clients = await Client.findAll()

        return res.status(200).send(clients)

    } catch (error) {
        errorHandler(error, res)
    }
}


const getClientById = async (req, res) => {
    try {

        const client = await Client.findByPk(req.params.id)

        if (!client?.dataValues) {
            return res.status(400).send({ message: "client topilmadi" })
        }

        return res.status(200).send(client)

    } catch (error) {
        errorHandler(error, res)
    }
}


const updateClient = async (req, res) => {
    try {

        const id = req.params.id

        const client = await Client.update({ ...req.body }, { where: { id } })

        if (!client?.dataValues) {
            return res.status(204).send({ message: "client topilmadi" })
        }

        return res.status(200).send(client)

    } catch (error) {
        errorHandler(error, res)
    }
}


const deleteClient = async (req, res) => {
    try {

        const id = req.params.id

        await Client.destroy({ where: { id } })

        return res.status(200).send({ message: "deleted" })

    } catch (error) {
        errorHandler(error, res)
    }
}


module.exports = {
    createClient,
    updateClient,
    getClients,
    getClientById,
    deleteClient
}