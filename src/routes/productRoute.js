const express = require('express');
const route = express.Router();
const upload = require('../middleware/uploadImage');
const {verifyToken, adminOnly} = require('../middleware/jwtVerifyToken');
const productValSchema = require('../middleware/validator/productValidation');
const { showProduct,
        showProductById,
        insertProduct,
        updateProduct,
        deleteProduct} = require('../controller/productController');

route.get('/', verifyToken, showProduct);
route.get('/:idProduct', verifyToken, showProductById);
route.post('/', verifyToken, adminOnly, upload.single('photo'), productValSchema, insertProduct);
route.patch('/:idProduct', verifyToken, adminOnly, upload.single('photo'), productValSchema, updateProduct);
route.delete('/:idProduct', verifyToken, adminOnly, deleteProduct);

module.exports = route;
