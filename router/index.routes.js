const router = require("express").Router()

const freelancerRouter = require('./freelancer.routes')

router.use('/freelancer', freelancerRouter)

module.exports  = router