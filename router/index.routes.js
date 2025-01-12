const router = require("express").Router()

const freelancerRouter = require('./freelancer.routes')
const adminRouter = require('./admin.routes')

router.use('/freelancer', freelancerRouter)
router.use('/admin', adminRouter)

module.exports  = router