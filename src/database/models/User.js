module.exports = (sequelize, DataTypes) => {

    let alias = 'Users'

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER, 
        },
        nombre_y_apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        is_admin: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        }
    }

    let config = {
        tableName: "users",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config)

    return User
}