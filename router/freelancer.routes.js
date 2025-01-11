const { createFreelancer } = require("../controller/freelancer.controller")

const router = require("express").Router()


router.post('/', createFreelancer)


module.exports  = router