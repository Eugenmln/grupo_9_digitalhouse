const express = require ('express')
const path = require ('path')
const router = express.Router ()
const validateProductMiddleware = require("../middlewares/validateProductMiddleware");



// Multer
const multer = require ('multer')
let multerDiskStorage = multer.diskStorage (
{
destination: (req, file, callback) => {
let folder = path.join (__dirname, '../../public/images')
callback (null, folder)
},
filename: (req, file, callback) => {
let imageName = 'product-' + Date.now() + path.extname (file.originalname)
callback (null, imageName)
},
}
)
let fileUpload = multer({storage: multerDiskStorage})

// Requerimiento del controlador

let productsController = require ('../controllers/productsController')

//Rutas

router.get ('/buscarPorNombre', productsController.buscarPorNombre)

router.get ('/buscarPorCategoria', productsController.buscarPorCategoria)

router.get ('/', productsController.list)

router.get ('/productos', productsController.productos)

router.get ('/cervezas', productsController.cervezas)

router.get ('/vinos', productsController.vinos)

router.get ('/licores', productsController.licores)

router.get ('/espirituosas', productsController.espirituosas)


// router.get ('/productos', productsController.productos)

router.get ('/create', productsController.create)

router.get ('/:id', productsController.detalle)

router.post ('/', fileUpload.single ('imagen'), validateProductMiddleware, productsController.store)

router.get ('/:id/edit', productsController.edit)

router.put ('/:id', fileUpload.single ('imagen'), validateProductMiddleware, productsController.update)

router.delete ('/:id', productsController.delete)


module.exports = router