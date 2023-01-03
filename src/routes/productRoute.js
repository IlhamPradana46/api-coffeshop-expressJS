const express = require('express');
const route = express.Router();
const upload = require('../middleware/uploadImage');
const productValSchema = require('../middleware/validator/productValidation');

const ProductController = require('../controller/productController');

route.get('/', ProductController.showProduct);
route.get('/:idProduct', ProductController.showProductById);
route.post('/', upload.single('photo'), productValSchema, ProductController.insertProduct);
route.patch('/:idProduct', upload.single('photo'), productValSchema ,ProductController.updateProduct);
route.delete('/:idProduct', ProductController.deleteProduct);

module.exports = route;
