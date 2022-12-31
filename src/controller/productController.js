const Product = require('../models/ProductModel');
const response = require('../utils/response');
const fs = require('fs');

const showProduct = async (req, res) => {
    try {
        const showProduct = await Product.findAll();
        res.status(200).json(showProduct);
    } catch (error) {
        res.json(error)
    }
}

const showProductById = async (req, res) => {
    
    id = req.params.idProduct;

    const showProductById = await Product.findOne({ where : { id : id }});
    if(showProductById == null) return response.error(404, null, "Product data not found !", res);
    response.success(200, showProductById, `Product Data with id ${id} has found!` , res);

}

const insertProduct = async (req, res) => {
    
    if (req.file == null) {
        res.status(400).json({message : "Product image not filled !"});  
    } else {
        
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
            response.success(200, data, "Insert Data Product Successfuly!", res);
        } catch (error) {
            response.error(400, err, "Insert Data Prodcut Failed ! ", res);
        }
    } 
}
    
const updateProduct = async (req, res) => {
    
    findId = req.params.idProduct
    
    const findProductById = await Product.findOne({ where : { id : findId }});

    const data =  findProductById.dataValues

    if(findProductById == null) return res.status(404).json({message : "Product data not found !"});

    if ( req.file == null ) {
        console.log("ok");
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
    } else {
        try {
            console.log("update pake gambar ni boss");
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
            fs.unlinkSync(`public/images/${data.image}`);
            response.success(200, req.body , "Product data updated !", res);
        } catch (error) {
            response.error(500, error, "Update data failed !", res);
        }
    }
}

const deleteProduct = async (req, res) => {
    findId = req.params.idProduct
    
    const findProductById = await Product.findOne({ where : { id : findId }});
    if(findProductById == null) return res.status(404).json({message : "Product data not found !"});
    
    const data =  findProductById.dataValues;

    try {
       await Product.destroy({where : {id : findId}}); 
        fs.unlinkSync(`public/images/${data.image}`);
        console.log(data.image);
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