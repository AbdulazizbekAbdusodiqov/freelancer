const router = require("express").Router()

const freelancerRouter = require('./freelancer.routes')
const adminRouter = require('./admin.routes')
const clinetRouter = require('./client.routes')

router.use('/freelancer', freelancerRouter)
router.use('/admin', adminRouter)
router.use('/client', clinetRouter)

module.exports  = router