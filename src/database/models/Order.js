module.exports = (sequelize, dataTypes) => {

    let alias = 'Orders'

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER, 
        },
        fecha_compra: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        total_compra: {
            type: dataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER,
            references: {model: "Users", key: "id"}
        } 
    }

    let config = {
        tableName: "orders",
        timestamps: false
    }

    const Order = sequelize.define(alias, cols, config)

    Order.associate = function (models) {
        Order.belongsTo(models.Users, {
            as: 'users',
            foreignKey: 'user_id'
        })
        Order.belongsToMany(models.Products, {
            as: 'products',
            through: 'orders_products',
            foreignKey: 'order_id',
            otherKey: 'product_id',
            timestamps: false
        })
    }
    

    return Order
}