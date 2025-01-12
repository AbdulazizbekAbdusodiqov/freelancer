const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Client = sequelize.define("client", {
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
    bio: {
        type: DataTypes.STRING(500)
    },
    password: {
        type: DataTypes.STRING,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    verification: {
        type: DataTypes.STRING,
    },
    refresh_token: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
});


module.exports = Client