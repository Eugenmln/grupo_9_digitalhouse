const express = require ('express');
const router = express.Router();

// Requerimiento del controlador 

let apisController = require ('../controllers/apisController')

// Rutas

router.get('/users', apisController.usersList)

router.get('/users/:id', apisController.usersDetail)

router.get('/products', apisController.productsList)

router.get('/products/:id', apisController.productsDetail)



module.exports = router