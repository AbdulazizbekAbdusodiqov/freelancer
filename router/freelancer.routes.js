const { createFreelancer, getFreelancers, getFreelancerById, updateFreelancer, deleteFreelancer, activateFreelancer } = require("../controller/freelancer.controller")
const freelancerGuard = require("../middleware/freelancer.guard")
const freelancerSelfGuard = require("../middleware/freelancerSelf.guard")

const router = require("express").Router()


router.post('/',freelancerGuard , createFreelancer)
router.get('/',freelancerGuard, getFreelancers)
router.get('/:id', freelancerGuard,getFreelancerById)
router.put('/:id',freelancerGuard, freelancerSelfGuard, updateFreelancer)
router.delete('/:id',freelancerGuard,freelancerSelfGuard, deleteFreelancer )
router.get('/activate/:link', activateFreelancer )


module.exports  = router