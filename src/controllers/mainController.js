const path = require ('path')
const {validationResult} = require ("express-validator");
let db = require ('../database/models')
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Product = db.Product;


let mainController = {
    home: (req, res) => {
        db.Products.findAll({
            order: [['nombre', 'ASC']]
        })
            .then((products) => {
                res.render (path.join (__dirname, '../views/home.ejs'), {products: products})
            })
          
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
    envio:(req, res) => res.render ("users/tiempodeenvio"),

    costo:(req, res) => res.render ("users/costodeenvio"),
}

module.exports = mainController