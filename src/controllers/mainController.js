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
}

module.exports = mainController