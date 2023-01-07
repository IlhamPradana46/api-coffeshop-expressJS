const express = require('express');
const route = express.Router();
const upload = require('../middleware/uploadImage');
const productValSchema = require('../middleware/validator/productValidation');
const { showProduct,
        showProductById,
        insertProduct,
        updateProduct,
        deleteProduct} = require('../controller/productController');

route.get('/', showProduct);
route.get('/:idProduct', showProductById);
route.post('/', upload.single('photo'), productValSchema, insertProduct);
route.patch('/:idProduct', upload.single('photo'), productValSchema, updateProduct);
route.delete('/:idProduct', deleteProduct);

module.exports = route;
