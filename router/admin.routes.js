const { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin } = require("../controller/admin.controller")
const adminGuard = require("../middleware/admin.guard")
const adminSelfGuard = require("../middleware/adminSelf.guard")

const router = require("express").Router()


router.post('/',adminGuard, createAdmin)
router.get('/',adminGuard, getAdmins)
router.get('/:id',adminGuard, getAdminById)
router.put('/:id',adminGuard, adminSelfGuard, updateAdmin)
router.delete('/:id',adminGuard, adminSelfGuard, deleteAdmin )


module.exports  = router