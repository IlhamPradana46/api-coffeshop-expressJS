const Sequelize = require('sequelize');
const sequelize = require('../config/Database');

const {DataTypes} = Sequelize;
    
    const User = sequelize.define("User", {
        id : {
            primaryKey : true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        username : {
            type : DataTypes.STRING
        },
        role : {
            type : DataTypes.STRING
        },
        password : {
            type : DataTypes.STRING
        },
        refresh_token : {
            type : DataTypes.STRING
        }

    });

module.exports = User;
