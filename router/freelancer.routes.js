const { createFreelancer, getFreelancers, getFreelancerById, updateFreelancer, deleteFreelancer } = require("../controller/freelancer.controller")

const router = require("express").Router()


router.post('/', createFreelancer)
router.get('/', getFreelancers)
router.get('/:id', getFreelancerById)
router.put('/:id', updateFreelancer)
router.delete('/:id', deleteFreelancer )


module.exports  = router