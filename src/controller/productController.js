const Product = require('../models/ProductModel');
const response = require('../utils/response');
const {validationResult} = require('express-validator');
const {doProductVal} = require('../middleware/validator/productValidation');
const fs = require('fs');


// Show All Product
const showProduct = async (req, res) => {
    try {
        const showProduct = await Product.findAll();
        res.status(200).json(showProduct);
    } catch (error) {
        res.json(error)
    }
}


// Show Product By ID
const showProductById = async (req, res) => {
    
    id = req.params.idProduct;

    const showProductById = await Product.findOne({ where : { id : id }});
    if(showProductById == null) return response.error(404, null, "Product data not found !", res);
    response.success(200, showProductById, `Product Data with id ${id} has found!` , res);

}


// Insert Product
const insertProduct = async (req, res) => {
    
    //Validate if form image not filled
    if (req.file == null) return res.status(400).json({message : "Product image not filled !"});  
        
    // Validate form input
    const errors = validationResult(req);

    if(!errors.isEmpty()) return response.error(422, errors, "validation error", res);

    // get image filename
    let imgName = req.file.filename

    const data = {
        product_name : req.body.product_name,
        stock : req.body.stock,
        price : req.body.price,
        image : imgName,
        url_image : `${req.protocol}://${req.get('host')}/${imgName}`
    }
    
    try {
        Product.create(data);
        return response.success(200, data, "Insert Data Product Successfuly!", res);
    } catch (error) {
        return response.error(400, error, "Insert Data Prodcut Failed ! ", res);
    }
}
    

//update product
const updateProduct = async (req, res) => {
    
    findId = req.params.idProduct
    
    // validate if id product is exist or not
    const findProductById = await Product.findOne({ where : { id : findId }});

    const data =  findProductById.dataValues

    // validate if id product is not exist
    if(findProductById == null) return res.status(404).json({message : "Product data not found !"});

    // validation if form not completly filled
    const errors = validationResult(req);

    if(!errors.isEmpty()) return response.error(422, errors, "validation error", res);
    
    if ( req.file == null ) { // update if image not uploaded 
        try {
            await Product.update({
                product_name : req.body.product_name,
                stock : req.body.stock,
                price : req.body.price,
                image : data.image,
                url_image : data.url_image
            } , 
            {
                where : {
                    id : findId
                }
            });
            response.success(200, req.body , "Product data updated !", res);
        } catch (error) {
            response.error(500, error, "Update data failed !", res);
        }
    } else { // update if image uploaded
        try {

            // delete the old images
            fs.unlinkSync(`public/images/${data.image}`);

            let imgName = req.file.filename

            await Product.update({
                product_name : req.body.product_name,
                stock : req.body.stock,
                price : req.body.price,
                image : imgName,
                url_image :  `${req.protocol}://${req.get('host')}/${imgName}`
            } , 
            {
                where : {
                    id : findId
                }
            });
            
            response.success(200, req.body , "Product data updated !", res);
        } catch (error) {
            response.error(500, error, "Update data failed !", res);
        }
    }
}


// Delete product
const deleteProduct = async (req, res) => {
    findId = req.params.idProduct
    
    // validate if id product is exist or not
    const findProductById = await Product.findOne({ where : { id : findId }});
    
    // validate if id product is not exist
    if(findProductById == null) return res.status(404).json({message : "Product data not found !"});
    
    const data =  findProductById.dataValues;

    try {
        await Product.destroy({where : {id : findId}}); 
        fs.unlinkSync(`public/images/${data.image}`);

        response.success(200, req.body , "Product data deleted !", res);
    } catch (error) {
        response.error(500, error, "Delete data failed !", res);
    }
}

module.exports = {
    showProduct,
    showProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}