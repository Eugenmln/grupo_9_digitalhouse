const path = require ('path');
const {validationResult} = require ("express-validator");
const bcryptjs = require('bcryptjs')
let db = require ('../database/models')


let usersController = {

    carrito: (req, res) => res.render ("users/carrito"),

    register:(req, res) => {    
        return res.render ("users/register")
    },

    login:(req, res) => res.render ("users/login"),




    list: (req, res) => {
        db.Users.findAll({
            order: [['nombre_y_apellido', 'ASC']]
        })
            .then((users) => {
                res.render (path.join (__dirname, '../views/users/list.ejs'), {users: users})
            })
    },

    //Proceso de Registro

    processRegister: (req, res) => {

        let resultValidation = validationResult (req);

        if (resultValidation.errors.length > 0) {
            return res.render ("users/register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        db.Users.findOne({ 
            where: {
                email: req.body.email
            }           
        })    
            .then ((userInData) => {
                if(userInData != null){
                    return res.render("users/register", {
                        errors: {
                            email: {
                                msg: "Este email ya se encuentra registrado"
                            }
                        }
                    })
                }
                else {
                    db.Users.create({
                        nombre_y_apellido: req.body.nombre_y_apellido,
                        email: req.body.email,
                        contraseña: bcryptjs.hashSync(req.body.contraseña, 10),
                        avatar: req.file != undefined ? req.file.filename : null 
                    })
                        .then(() => {
                            res.redirect('/users/login')
                        })                               
                }
            })
    },

    //Proceso de Login

    loginProcess: (req, res) => {

        let loginValidation = validationResult(req)
        
        if (loginValidation.errors.length > 0) {
            return res.render ("users/login", {
                errors: loginValidation.mapped(),
                oldData: req.body
            });
        }

        db.Users.findOne({ 
            where: {
                email: req.body.email
            }           
        })  

            .then((userToLogin) => {
                if (userToLogin != null) {
                    let contraseñaOk = bcryptjs.compareSync(req.body.contraseña, userToLogin.contraseña) 
                    if(contraseñaOk) {
                        delete userToLogin.contraseña;
                        req.session.userLogged = userToLogin;
            
                        if(req.body.recordame){
                            res.cookie("userEmail", req.body.email, {maxAge: (1000 * 120)})
                        }
            
                        return res.redirect("perfilDeusuario")
                    } else {
                        return res.render("users/login", {
                            errors: {
                                email: {
                                    msg: "La contraseña es incorrecta"
                                }
                            }
                        })
                    }
                } else {
                    return res.render("users/login", {
                        errors: {
                            email: {
                                msg: "No se encuentra un usuario registrado con el correo electrónico ingresado"
                            }
                        }
                    })
                }
            })
    },
    
    profile: (req, res) => {
		res.render('users/perfilDeusuario', { 
            user: req.session.userLogged
         }); 
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect("/")
    },
}


module.exports = usersController