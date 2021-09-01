const express = require ('express')
const path = require ('path')
const router = express.Router ()
const validateProductMiddleware = require("../middlewares/validateProductMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");


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

router.get ('/buscarPorNombre', adminMiddleware, productsController.buscarPorNombre)

router.get ('/buscarPorCategoria', adminMiddleware, productsController.buscarPorCategoria)

router.get ('/', adminMiddleware, productsController.list)

// router.get ('/productos', productsController.productos)

router.get ('/create', adminMiddleware, productsController.create)

router.get ('/:id', productsController.detalle)

router.post ('/', adminMiddleware, fileUpload.single ('imagen'), validateProductMiddleware, productsController.store)

router.get ('/:id/edit', adminMiddleware, productsController.edit)

router.put ('/:id', adminMiddleware, fileUpload.single ('imagen'), validateProductMiddleware, productsController.update)

router.delete ('/:id', adminMiddleware, productsController.delete)

module.exports = router