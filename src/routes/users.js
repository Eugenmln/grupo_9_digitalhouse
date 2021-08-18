const express = require ('express');
const router = express.Router();

// Middlewares 

const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const upload =  require("../middlewares/multerMiddleware");
const registerValidation =  require("../middlewares/validateRegisterMiddleware")
const loginValidation = require("../middlewares/validateLoginMiddleware")

// Requerimiento del controlador 

let usersController = require ('../controllers/usersController')

// Rutas

router.get('/carrito', usersController.carrito)

router.get('/register',guestMiddleware, usersController.register)

router.get('/login',guestMiddleware, loginValidation, usersController.login)

router.post("/login", loginValidation, usersController.loginProcess)

router.get("/perfilDeusuario", authMiddleware, usersController.profile)

router.get("/logout", usersController.logout)

router.get ('/list', usersController.list)

router.post("/register", upload.single("avatar"), registerValidation, usersController.processRegister);

module.exports = router