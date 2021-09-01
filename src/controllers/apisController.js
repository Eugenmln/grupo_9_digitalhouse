const path = require ('path');
let db = require ('../database/models')

let apisController = {

    usersList: (req, res) => {
        db.Users.findAll()
            .then(users => {
                return res.status(200).json({
                    count: users.length,
                    users: users.map(function(user) {
                        return {
                            id: user.id,
                            name: user.nombre_y_apellido,
                            email: user.email,
                            detail: `http://localhost:1050/api/users/${user.id}`
                            //en realidad acá debería ser la vista del detalle del usuario
                        }
                    })
                })
            })
            .catch(error => console.log(error))
    },

    usersDetail: (req, res) => {
        db.Users.findByPk(req.params.id) 
            .then(user => {
                    return res.status(200).json({
                    id: user.id,
                    name: user.nombre_y_apellido,
                    email: user.email,
                    avatar: `http://localhost:1050/images/avatar/${user.avatar}`
                })
            })
            .catch(error => console.log(error))
    },

    productsList: (req, res) => {
        db.Products.findAll()
            .then(products => {
                let cantidadDeVinos = []
                let cantidadDeEspirituosas = []
                let cantidadDeCervezas = []
                let cantidadDeLicores = []
                for (let i=0; i<products.length; i++) {
                    switch(products[i].category_id) {
                        case 1: cantidadDeVinos.push("Vino")
                        break
                        case 2: cantidadDeEspirituosas.push("Espirituosa")
                        break
                        case 3: cantidadDeCervezas.push("Cerveza")
                        break
                        case 4: cantidadDeLicores.push("Licor")
                        break
                    }
                } 
                return res.status(200).json({
                    count: products.length,
                    countByCategory: {
                        Vinos: cantidadDeVinos.length,
                        Espirituosas: cantidadDeEspirituosas.length,
                        Cervezas: cantidadDeCervezas.length,
                        Licores: cantidadDeLicores.length
                    },
                    products: products.map(function(product) {
                        switch (product.category_id) {
                            case 1: product.category_id = "Vino"
                            break
                            case 2: product.category_id= "Espirituosa"
                            break
                            case 3: product.category_id = "Cerveza"
                            break
                            case 4: product.category_id = "Licor"
                            break
                        }
                        return {
                            id: product.id,
                            name: product.nombre,
                            description: product.descripcion,
                            category: product.category_id,
                            price: product.precio,
                            detail: `http://localhost:1050/products/${product.id}`
                        }
                    })
                })
            })
            .catch(error => console.log(error))
    },

    productsDetail: (req, res) => {
        db.Products.findByPk(req.params.id) 
            .then(product => {
                switch (product.category_id) {
                    case 1: product.category_id = "Vino"
                    break
                    case 2: product.category_id= "Espirituosa"
                    break
                    case 3: product.category_id = "Cerveza"
                    break
                    case 4: product.category_id = "Licor"
                    break
                }
                return res.status(200).json({
                    id: product.id,
                    nombre: product.nombre,
                    descripcion: product.descripcion,
                    imagen: `http://localhost:1050/images/${product.imagen}`,
                    precio: product.precio,
                    stock: product.stock,
                    category: product.category_id
                })
            })
            .catch(error => console.log(error))        
    }

    
}


module.exports = apisController