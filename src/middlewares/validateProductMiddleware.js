const path = require("path");
const { body } = require("express-validator");

module.exports = [

    body("nombre").notEmpty().withMessage("Ingresá el nombre del producto").bail(),
    body("nombre").isLength({min:5}).withMessage("El nombre del producto debe tener al menos 5 caracteres"),
    body("descripcion").notEmpty().withMessage("Ingresá la descripción del producto").bail(),
    body("descripcion").isLength({min:20}).withMessage("La descripción del producto debe tener al menos 20 caracteres"),
    body("precio").notEmpty().withMessage("Ingresá el precio del producto"),
    body("stock").notEmpty().withMessage("Ingresá el stock del producto"),
    body("categoria").notEmpty().withMessage("Seleccioná una categoría para el producto"),
    body("imagen").custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg',  '.JPG', '.png', '.PNG', '.jpeg', '.JPEG', '.gif', '.GIF']
        if (file && !acceptedExtensions.includes(path.extname(file.originalname))) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        } 
        return true;
    })
 

]

