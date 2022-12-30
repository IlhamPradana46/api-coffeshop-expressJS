const express = require('express');
const route = express.Router();
const upload = require('../middleware/uploadImage');

const ProductController = require('../controller/productController');

route.get('/', ProductController.showProduct);
route.get('/:idProduct', ProductController.showProductById);
route.post('/', upload.single('photo') ,ProductController.insertProduct);
route.patch('/:idProduct', upload.single('photo'), ProductController.updateProduct);
route.delete('/:idProduct', ProductController.deleteProduct);

module.exports = route;
