const {check} = require("express-validator");

module.exports = [
    check("email").notEmpty().withMessage("Tenés que escribir un email").bail(),
    check("email").isEmail().withMessage("Tenés que escribir un email válido"),

    check("contraseña").notEmpty().withMessage("Tenés que escribir una contraseña con al menos 8 caracteres").bail(),
    check("contraseña").isLength({ min: 8 }).withMessage("Tenés que escribir una contraseña con al menos 8 caracteres"),
]