const Sequelize = require('sequelize');
const db = require('../config/Database');

const {DataTypes} = Sequelize;
    
    const Product = db.define("Product", {
        id :{
            primaryKey : true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },    
        product_name: {
            type: DataTypes.STRING
        },
        stock: {
            type: DataTypes.STRING
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
