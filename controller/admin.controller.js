const Admin = require("../models/Admin")
const errorHandler = require("../helpers/errorHandler")
const { adminValidation } = require("../validations/admin.validation")
const bcrypt = require("bcrypt")
const jwt = require("../service/jwt.service")

const createAdmin = async (req, res) => {
    try {
        const {
            email,
        } = req.body
        const oldAdmin = await Admin.findOne({ where: { email } })

        if (oldAdmin?.dataValues) {
            return res.status(400).send({ message: "bu email bilan oldin ro'yxatdan o'tilgan" })
        }

        const { error, value } = adminValidation(req.body)

        if (error) {
            errorHandler(error, res)
        }

        const hashedPassword = bcrypt.hashSync(value.password, 7)
        const newAdmin = Admin.build({ ...value, password: hashedPassword })

        const payload = {
            id: newAdmin.id,
            name: newAdmin.name,
            email: newAdmin.email,
            role: "admin"
        }

        const token = jwt.generateTokens(payload)

        newAdmin.refresh_token = token.refreshToken

        console.log(newAdmin);

        await newAdmin.save()

        return res.send(newAdmin)

    } catch (error) {
        errorHandler(error, res)
    }
}


const getAdmins = async (req, res) => {
    try {

        const admins = await Admin.findAll()

        return res.status(200).send(admins)

    } catch (error) {
        errorHandler(error, res)
    }
}


const getAdminById = async (req, res) => {
    try {

        const admin = await Admin.findByPk(req.params.id)

        if (!admin?.dataValues) {
            return res.status(400).send({ message: "admin topilmadi" })
        }

        return res.status(200).send(admin)

    } catch (error) {
        errorHandler(error, res)
    }
}


const updateAdmin = async (req, res) => {
    try {

        const id = req.params.id

        const admin = await Admin.update({ ...req.body }, { where: { id } })

        if (!admin?.dataValues) {
            return res.status(204).send({ message: "admin topilmadi" })
        }

        return res.status(200).send(admin)

    } catch (error) {
        errorHandler(error, res)
    }
}


const deleteAdmin = async (req, res) => {
    try {

        const id = req.params.id

        await Admin.destroy({ where: { id } })

        return res.status(200).send({ message: "deleted" })

    } catch (error) {
        errorHandler(error, res)
    }
}


module.exports = {
    createAdmin,
    updateAdmin,
    getAdmins,
    getAdminById,
    deleteAdmin
}