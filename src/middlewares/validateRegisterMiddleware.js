const path = require ("path");
const { body } = require ("express-validator");


module.exports = [
    
    body ("nombre_y_apellido").notEmpty().withMessage("Tenés que escribir tu nombre y apellido").bail(),
    body ("nombre_y_apellido").isLength({ min: 2}).withMessage("El nombre debe tener al menos 2 caracteres"),
    body ("email").notEmpty().withMessage("Tenés que escribir tu email").bail().isEmail().withMessage("Formato no válido para correo electrónico"),
    body ("contraseña").notEmpty().withMessage("Tenés que escribir una constraseña con al menos 8 caracteres").bail().isLength({ min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body ("confirmar").notEmpty().withMessage("Tenes que confirmar tu contaseña.").bail(),
    body ('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.JPG', '.png', '.PNG', '.jpeg', '.JPEG', '.gif', '.GIF'];

        if (!file) {
            throw new Error('Tenés que subir una imagen de perfil');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }

        return true;
    })



 ]