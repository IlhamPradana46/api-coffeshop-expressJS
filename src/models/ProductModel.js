const Sequelize = require('sequelize');
const sequelize = require('../config/Database');

const {DataTypes} = Sequelize;
    
    const Product = sequelize.define("Product", {
        id : {
            primaryKey : true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },    
        product_name: {
            type: DataTypes.STRING
        },
        stock: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.INTEGER
        },
        image : {
            type : DataTypes.STRING
        },
        url_image : {
            type : DataTypes.STRING
        }
    });

module.exports = Product;
