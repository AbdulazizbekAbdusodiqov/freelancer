const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Freelancer = sequelize.define("freelancer", {
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
    hourly_rate: {
        type: DataTypes.DECIMAL(15, 2)
    },
    portfolio_url: {
        type: DataTypes.STRING
    },
    availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    rating: {
        type: DataTypes.DECIMAL,
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
    activation_link: {
        type: DataTypes.STRING,
    },
    refresh_token: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
});


module.exports = Freelancer