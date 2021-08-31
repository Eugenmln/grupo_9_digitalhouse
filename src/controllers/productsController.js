const path = require ('path')
const {validationResult} = require ("express-validator");
let db = require ('../database/models')

let productsController = {    

create: (req, res) => {
    db.Categories.findAll()
        .then(function(categories) {
            return res.render (path.join (__dirname, '../views/products/create.ejs'), {categories:categories})
        })
},

store: (req, res) => {

    let resultValidation = validationResult (req);

    if (resultValidation.errors.length > 0) {
        db.Categories.findAll()
            .then(function(categories) {
                return res.render (path.join (__dirname, '../views/products/create.ejs'), {
                    categories:categories,
                    errors: resultValidation.mapped(),
                    oldData: req.body                
                })
            })
    } else {
        if (req.file) {
            var imagenProducto = req.file.filename
        } else {
            imagenProducto = null
        }    

        db.Products.findOne({ 
            where: {
                nombre: req.body.nombre
            }           
        })    
            .then ((productInData) => {
                if(productInData != null){
                    db.Categories.findAll()
                        .then(function(categories) {
                            return res.render ('products/create', {
                                categories: categories,
                                errors: {
                                    email: {
                                        msg: "Este producto ya se encuentra registrado"
                                    }
                                } 
                            })       
                        })                    
                }
                else {
                        db.Products.create({
                            nombre: req.body.nombre,
                            descripcion: req.body.descripcion,
                            imagen: imagenProducto,
                            precio: req.body.precio,
                            stock: req.body.stock, 
                            category_id: req.body.categoria
                        })
                            .then (() => res.redirect('/products'))
                }
           })
    }
},

edit: (req, res) => {
    Promise.all([db.Products.findByPk(req.params.id), db.Categories.findAll()])
            .then(([product, categories]) => {
                res.render (path.join (__dirname, '../views/products/edit.ejs'), {product: product, categories: categories})
            })
},

update: (req, res) => {

    let resultValidation = validationResult (req);

    if (resultValidation.errors.length > 0) {
        Promise.all([db.Products.findByPk(req.params.id), db.Categories.findAll()])
            .then(([product, categories]) => {
                res.render (path.join (__dirname, '../views/products/edit.ejs'), {
                    product: product, 
                    categories: categories,
                    errors: resultValidation.mapped(),
                })
            })
    } else {

        if (req.file) {
            var imagenProducto = req.file.filename
        } else {
            imagenProducto = null
        }    

        db.Products.update({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            imagen: imagenProducto,
            stock: req.body.stock, 
            category_id: req.body.categoria
        }, {
            where: {
                id: req.params.id
            }
        })
            .then (() => res.redirect('/products'))               
    }
},

delete: (req, res) => {
    db.Products.destroy({
        where: {
            id: req.params.id
        }
    })
     .then(() => res.redirect('/products'))
},

cervezas: (req, res) => {
    db.Products.findAll({
        where: {
            category_id: 3
        }
    })
        .then((cervezas) => {
            res.render('products/cervezas', {cervezas: cervezas})
        })

},
vinos: (req, res) => {
    db.Products.findAll({
        where: {
            category_id: 1
        }
    })
        .then((vinos) => {
            res.render('products/vinos', {vinos: vinos})
        })

},
licores: (req, res) => {
    db.Products.findAll({
        where: {
            category_id: 4
        }
    })
        .then((licores) => {
            res.render('products/licores', {licores: licores})
        })

},
espirituosas: (req, res) => {
    db.Products.findAll({
        where: {
            category_id: 2
        }
    })
        .then((espirituosas) => {
            res.render('products/espirituosas', {espirituosas: espirituosas})
        })

},

list: (req, res) => {
    db.Products.findAll({
        order: [['nombre', 'ASC']]
    })
        .then((products) => {
            res.render (path.join (__dirname, '../views/products/list.ejs'), {products: products})
        })
},
productos: (req, res) => {
    db.Products.findAll({
        order: [['nombre', 'ASC']]
    })
        .then((products) => {
            res.render (path.join (__dirname, '../views/products/products.ejs'), {products: products})
        })
},

detalle: (req, res) => {
    db.Products.findByPk(req.params.id)
        .then((product) => {
            res.render (path.join (__dirname, '../views/products/detalle.ejs'), {product: product})
        })
},

buscarPorNombre: (req, res) => {
    db.Products.findOne({
        where: {
            nombre: req.query.nombre
        }
    })
        .then((product) => {
            res.render (path.join (__dirname, '../views/products/detalle.ejs'), {product: product})
        })
},

buscarPorCategoria: (req, res) => {
    let categoria
    db.Categories.findAll()
        .then(function(categories) {
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].nombre == req.query.categoria) {
                    categoria = i + 1
                } 
            }
        })

    let productsResult = []
    db.Products.findAll()
        .then(function(products) {
            for (let i = 0; i < products.length; i++) {
                if (products[i].category_id == categoria) {
                    productsResult.push(products[i])        
                }
            }
            res.render (path.join (__dirname, '../views/products/buscarPorCategoria.ejs'), {productsResult: productsResult})
        })  
},
}

module.exports = productsController