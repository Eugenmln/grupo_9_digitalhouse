const express = require ('express')

const router = express.Router ()

const path = require ('path')

let mainController = require ('../controllers/mainController')

router.get ('/', mainController.home)

router.get ('/cervezas', mainController.cervezas)

router.get ('/vinos', mainController.vinos)

router.get ('/licores', mainController.licores)

router.get ('/espirituosas', mainController.espirituosas)

router.get ('/envio', mainController.envio)

router.get ('/costo', mainController.costo)
module.exports = router