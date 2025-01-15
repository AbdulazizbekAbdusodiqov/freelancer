const { createClient, getClients, getClientById, updateClient, deleteClient } = require("../controller/client.controller")
const clientGuard = require("../middleware/client.guard")
const clientSelfGuard = require("../middleware/clientSelf.guard")

const router = require("express").Router()


router.post('/',clientGuard, createClient)
router.get('/',clientGuard, getClients)
router.get('/:id',clientGuard, getClientById)
router.put('/:id',clientGuard, clientSelfGuard, updateClient)
router.delete('/:id', clientGuard,clientSelfGuard, deleteClient )


module.exports  = router