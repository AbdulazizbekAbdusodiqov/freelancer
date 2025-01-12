const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Admin = sequelize.define("admin", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50)
    },
    surname: {
        type: DataTypes.STRING(50)
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING(15)
    },
    password: {
        type: DataTypes.STRING,
    },
    refresh_token: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
});


module.exports = Admin